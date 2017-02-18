using System;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using System.Linq;
using System.Linq.Expressions;
using System.Text.RegularExpressions;
using Keta.Domain.System;
using ServiceStack;
using ServiceStack.Auth;
using ServiceStack.Data;
using ServiceStack.OrmLite;

namespace Keta.Web.Infraestructure
{
    public class UserAuthRepository : UserAuthRepository<UserAuth, UserAuthDetails>
    {
        public UserAuthRepository(IDbConnectionFactory dbFactory) : base(dbFactory) { }

        public UserAuthRepository(IDbConnectionFactory dbFactory, IHashProvider passwordHasher) : base(dbFactory, passwordHasher) { }
    }

    public class UserAuthRepository<TUserAuth, TUserAuthDetails> : IUserAuthRepository, IRequiresSchema, IClearable, IManageRoles
        where TUserAuth : class, IUserAuth, new()
        where TUserAuthDetails : class, IUserAuthDetails
    {
        //http://stackoverflow.com/questions/3588623/c-sharp-regex-for-a-username-with-a-few-restrictions
        public Regex ValidUserNameRegEx = new Regex(@"^(?=.{3,15}$)([A-Za-z0-9][._-]?)*$", RegexOptions.Compiled);

        public int? MaxLoginAttempts { get; set; }

        private readonly IDbConnectionFactory dbFactory;
        private readonly IHashProvider passwordHasher;
        //private readonly ContactService contactService;
        //private readonly UserService userService;
        //private bool hasInitSchema;

        public UserAuthRepository(IDbConnectionFactory dbFactory)
            : this(dbFactory, new SaltedHash()) { }

        public UserAuthRepository(IDbConnectionFactory dbFactory, IHashProvider passwordHasher)
        {
            this.dbFactory = dbFactory;
            this.passwordHasher = passwordHasher;
            //this.contactService = HostContext.TryResolve<ContactService>();
            //this.userService = HostContext.TryResolve<UserService>();
        }

        public void InitSchema()
        {
            throw new NotImplementedException();
        }

        public void CreateMissingTables()
        {
            throw new NotImplementedException();
        }

        public void DropAndReCreateTables()
        {
            throw new NotImplementedException();
        }

        private void ValidateNewUser(IUserAuth newUser, string password)
        {
            newUser.ThrowIfNull("newUser");
            password.ThrowIfNullOrEmpty("password");

            if (newUser.UserName.IsNullOrEmpty() && newUser.Email.IsNullOrEmpty())
            {
                throw new ArgumentNullException("UserName or Email is required");
            }

            if (!newUser.UserName.IsNullOrEmpty())
            {
                if (!ValidUserNameRegEx.IsMatch(newUser.UserName))
                {
                    throw new ArgumentException("UserName contains invalid characters", "UserName");
                }
            }
        }

        public IUserAuth CreateUserAuth(IUserAuth newUser, string password)
        {
            ValidateNewUser(newUser, password);

            using (var db = dbFactory.Open())
            {
                AssertNoExistingUser(db, newUser);

                string salt;
                string hash;
                passwordHasher.GetHashAndSaltString(password, out hash, out salt);
                var digestHelper = new DigestAuthFunctions();
                newUser.DigestHa1Hash = digestHelper.CreateHa1(newUser.UserName, DigestAuthProvider.Realm, password);
                newUser.PasswordHash = hash;
                newUser.Salt = salt;
                newUser.CreatedDate = DateTime.UtcNow;
                newUser.ModifiedDate = newUser.CreatedDate;

                db.Save((UserAuth)newUser);

                newUser = db.SingleById<UserAuth>(newUser.Id);
                return newUser;
            }
        }

        public void DeleteUserAuth(string userName)
        {
            throw new NotImplementedException();
        }

        private void AssertNoExistingUser(IDbConnection db, IUserAuth newUser, IUserAuth exceptForExistingUser = null)
        {
            if (newUser.UserName != null)
            {
                var existingUser = GetUserAuthByUserName(db, newUser.UserName);
                if (existingUser != null
                    && (exceptForExistingUser == null || existingUser.Id != exceptForExistingUser.Id))
                {
                    throw new ArgumentException("User {0} already exists".Fmt(newUser.UserName));
                }
            }
            if (newUser.Email != null)
            {
                var existingUser = GetUserAuthByUserName(db, newUser.Email);
                if (existingUser != null
                    && (exceptForExistingUser == null || existingUser.Id != exceptForExistingUser.Id))
                {
                    throw new ArgumentException("Email {0} already exists".Fmt(newUser.Email));
                }
            }
        }

        public IUserAuth UpdateUserAuth(IUserAuth existingUser, IUserAuth newUser, string password)
        {
            ValidateNewUser(newUser, password);

            using (var db = dbFactory.Open())
            {
                AssertNoExistingUser(db, newUser, existingUser);

                var hash = existingUser.PasswordHash;
                var salt = existingUser.Salt;
                if (password != null)
                {
                    passwordHasher.GetHashAndSaltString(password, out hash, out salt);
                }
                // If either one changes the digest hash has to be recalculated
                var digestHash = existingUser.DigestHa1Hash;
                if (password != null || existingUser.UserName != newUser.UserName)
                {
                    var digestHelper = new DigestAuthFunctions();
                    digestHash = digestHelper.CreateHa1(newUser.UserName, DigestAuthProvider.Realm, password);
                }
                newUser.Id = existingUser.Id;
                newUser.PasswordHash = hash;
                newUser.Salt = salt;
                newUser.DigestHa1Hash = digestHash;
                newUser.CreatedDate = existingUser.CreatedDate;
                newUser.ModifiedDate = DateTime.UtcNow;

                db.Save((TUserAuth)newUser);

                return newUser;
            }
        }

        public IUserAuth GetUserAuthByUserName(string userNameOrEmail)
        {
            using (var db = dbFactory.Open())
            {
                return GetUserAuthByUserName(db, userNameOrEmail);
            }
        }

        private TUserAuth GetUserAuthByUserName(IDbConnection db, string userNameOrEmail)
        {
            var isEmail = userNameOrEmail.Contains("@");

            var user = isEmail
                ? db.Select<User>(q => q.Email == userNameOrEmail).FirstOrDefault()
                : db.Select<User>(q => q.UserName == userNameOrEmail).FirstOrDefault();

            return this.LoadUser(user);
        }

        public bool TryAuthenticate(string userName, string password, out IUserAuth userAuth)
        {
            userAuth = this.GetUserAuthByUserName(userName);
            return userAuth != null && userAuth.PasswordHash == password;
        }

        public bool TryAuthenticate(Dictionary<string, string> digestHeaders, string privateKey, int nonceTimeOut, string sequence, out IUserAuth userAuth)
        {
            //userId = null;
            userAuth = GetUserAuthByUserName(digestHeaders["username"]);
            if (userAuth == null)
            {
                return false;
            }

            var digestHelper = new DigestAuthFunctions();
            if (digestHelper.ValidateResponse(digestHeaders, privateKey, nonceTimeOut, userAuth.DigestHa1Hash, sequence))
            {
                //userId = userAuth.Id.ToString(CultureInfo.InvariantCulture);
                return true;
            }
            userAuth = null;
            return false;
        }

        public void LoadUserAuth(IAuthSession session, IAuthTokens tokens)
        {
            session.ThrowIfNull("session");

            var userAuth = GetUserAuth(session, tokens);
            LoadUserAuth(session, userAuth);
        }

        private void LoadUserAuth(IAuthSession session, IUserAuth userAuth)
        {
            if (userAuth == null)
            {
                return;
            }

            var idSesije = session.Id; //first record session Id (original session Id)
            session.PopulateWith(userAuth); //here, original sessionId is overwritten with facebook user Id
            session.Id = idSesije; //we return Id of original session here

            session.UserAuthId = userAuth.Id.ToString(CultureInfo.InvariantCulture);
            session.ProviderOAuthAccess = GetUserAuthDetails(session.UserAuthId)
                .ConvertAll(x => (IAuthTokens)x);
        }

        public IUserAuth GetUserAuth(string userAuthId)
        {
            using (var db = dbFactory.Open())
            {
                var user = db.LoadSingleById<User>(int.Parse(userAuthId));
                if (user != null)
                {
                    return this.LoadUser(user);
                }
            }

            return null;
        }

        private TUserAuth LoadUser(User user)
        {
            TUserAuth userAuth = null;
            if (user != null)
            {
                userAuth = new TUserAuth
                {
                    Id = user.Id,
                    UserName = user.UserName,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    PasswordHash = user.Password,
                    Email = user.Email
                    //        CreatedDate = user.CreatedOnUtc.ToLocalTime(),
                    //        DisplayName = user.Username,
                    //        Email = user.Email,
                    //        FirstName = contactNameData == null ? string.Empty : contactNameData.FirstName,
                    //        LastName = contactNameData == null ? string.Empty : contactNameData.LastName,
                    //        FullName = contactNameData == null ? string.Empty : contactNameData.FullName,
                    //        Id = user.Id,
                    //        ModifiedDate = user.LastActivityDateUtc.ToLocalTime(),
                    //        UserName = user.Username,
                    //        PasswordHash = hash,
                    //        Salt = salt,
                    //        Roles = userService.GetRolesByUserId(user.Id).Select(x => x.SystemName).ToList()
                };
            }

            return userAuth;
        }

        public void SaveUserAuth(IAuthSession authSession)
        {
            using (var db = dbFactory.Open())
            {
                var userAuth = !authSession.UserAuthId.IsNullOrEmpty()
                    ? db.SingleById<TUserAuth>(authSession.UserAuthId)
                    : authSession.ConvertTo<TUserAuth>();

                if (userAuth.Id == default(int) && !authSession.UserAuthId.IsNullOrEmpty())
                {
                    userAuth.Id = int.Parse(authSession.UserAuthId);
                }

                userAuth.ModifiedDate = DateTime.UtcNow;
                if (userAuth.CreatedDate == default(DateTime))
                {
                    userAuth.CreatedDate = userAuth.ModifiedDate;
                }

                db.Save(userAuth);
            }
        }

        public void SaveUserAuth(IUserAuth userAuth)
        {
            userAuth.ModifiedDate = DateTime.UtcNow;
            if (userAuth.CreatedDate == default(DateTime))
            {
                userAuth.CreatedDate = userAuth.ModifiedDate;
            }

            using (var db = dbFactory.Open())
            {
                db.Save((TUserAuth)userAuth);
            }
        }

        public List<IUserAuthDetails> GetUserAuthDetails(string userAuthId)
        {
            //var id = int.Parse(userAuthId);
            //using (var db = dbFactory.Open())
            //{
            //    return db.Select<UserAuthDetails>(q => q.UserAuthId == id).OrderBy(x => x.ModifiedDate).Cast<IUserAuthDetails>().ToList();
            //}
            return new List<IUserAuthDetails>();
        }

        public IUserAuth GetUserAuth(IAuthSession authSession, IAuthTokens tokens)
        {
            if (!authSession.UserAuthId.IsNullOrEmpty())
            {
                var userAuth = GetUserAuth(authSession.UserAuthId);
                if (userAuth != null)
                {
                    return userAuth;
                }
            }
            if (!authSession.UserAuthName.IsNullOrEmpty())
            {
                var userAuth = GetUserAuthByUserName(authSession.UserAuthName);
                if (userAuth != null)
                {
                    return userAuth;
                }
            }

            if (tokens == null || tokens.Provider.IsNullOrEmpty() || tokens.UserId.IsNullOrEmpty())
            {
                return null;
            }

            using (var db = dbFactory.Open())
            {
                var oAuthProvider = db.Select<UserAuthDetails>(
                    q =>
                        q.Provider == tokens.Provider && q.UserId == tokens.UserId).FirstOrDefault();

                if (oAuthProvider != null)
                {
                    var userAuth = db.SingleById<TUserAuth>(oAuthProvider.UserAuthId);
                    return userAuth;
                }
                return null;
            }
        }

        public IUserAuthDetails CreateOrMergeAuthSession(IAuthSession authSession, IAuthTokens tokens)
        {
            TUserAuth local;
            TUserAuth userAuth = (TUserAuth)this.GetUserAuth(authSession, tokens);
            if (userAuth != null)
            {
                local = userAuth;
            }
            else
            {
                local = typeof(TUserAuth).CreateInstance<TUserAuth>();
            }
            using (IDbConnection connection = this.dbFactory.Open())
            {
                TUserAuthDetails instance = connection.Select<TUserAuthDetails>(((Expression<Func<TUserAuthDetails, bool>>)(q => ((q.Provider == tokens.Provider) && (q.UserId == tokens.UserId))))).FirstOrDefault<TUserAuthDetails>();
                if (instance == null)
                {
                    instance = typeof(TUserAuthDetails).CreateInstance<TUserAuthDetails>();
                    instance.Provider = tokens.Provider;
                    instance.UserId = tokens.UserId;
                }
                instance.PopulateMissing(tokens, true);
                local.PopulateMissingExtended(instance, false);
                local.ModifiedDate = DateTime.UtcNow;
                DateTime time = new DateTime();
                if (local.CreatedDate == time)
                {
                    local.CreatedDate = local.ModifiedDate;
                }
                connection.Save<TUserAuth>(local, false);
                instance.UserAuthId = local.Id;
                if (instance.CreatedDate == new DateTime())
                {
                    instance.CreatedDate = local.ModifiedDate;
                }
                instance.ModifiedDate = local.ModifiedDate;
                connection.Save<TUserAuthDetails>(instance, false);
                return instance;
            }
        }



        public void Clear()
        {
            throw new NotImplementedException();
        }

        public ICollection<string> GetRoles(string userAuthId)
        {
            //using (var db = dbFactory.Open())
            //{
            //    var query = db.From<Role>()
            //        .Join<UserRole>()
            //        .Select(x => x.SystemName)
            //        .Where<UserRole>(x => x.UserId == int.Parse(userAuthId));
            //    return db.Column<string>(query);
            //}

            return null;
        }

        public ICollection<string> GetPermissions(string userAuthId)
        {
            //using (var db = dbFactory.Open())
            //{
            //    var query = db.From<Permission>()
            //        .Join<RolePermission>()
            //        .Join<UserRole>()
            //        .Select(x => x.SystemName)
            //        .Where<UserRole>(x => x.UserId == int.Parse(userAuthId));
            //    return db.Column<string>(query);
            //}

            return null;
        }

        public bool HasRole(string userAuthId, string role)
        {
            if (role == null)
                throw new ArgumentNullException("role");

            if (userAuthId == null)
                return false;

            //using (var db = dbFactory.Open())
            //{
            //    return db.Exists(
            //        db.From<Role>()
            //        .Join<UserRole>()
            //        .Where<UserRole>(ur => ur.UserId == int.Parse(userAuthId))
            //        .And(r => r.SystemName == role)
            //        );
            //}

            return true;
        }

        public bool HasPermission(string userAuthId, string permission)
        {
            if (permission == null)
                throw new ArgumentNullException("permission");

            if (userAuthId == null)
                return false;

            //using (var db = dbFactory.Open())
            //{
            //    return db.Exists(
            //        db.From<Permission>()
            //        .Join<RolePermission>()
            //        .Join<UserRole>()
            //        .Where<UserRole>(ur => ur.UserId == int.Parse(userAuthId))
            //        .And(p => p.SystemName == permission)
            //        );
            //}

            return true;
        }

        public void AssignRoles(string userAuthId, ICollection<string> roles = null, ICollection<string> permissions = null)
        {
            var userAuth = GetUserAuth(userAuthId);
            using (var db = dbFactory.Open())
            {
                var now = DateTime.UtcNow;
                var userRoles = db.Select<UserAuthRole>(q => q.UserAuthId == userAuth.Id);

                if (!roles.IsEmpty())
                {
                    var roleSet = userRoles.Where(x => x.Role != null).Select(x => x.Role).ToHashSet();
                    foreach (var role in roles)
                    {
                        if (!roleSet.Contains(role))
                        {
                            db.Insert(new UserAuthRole
                            {
                                UserAuthId = userAuth.Id,
                                Role = role,
                                CreatedDate = now,
                                ModifiedDate = now,
                            });
                        }
                    }
                }

                if (!permissions.IsEmpty())
                {
                    var permissionSet = userRoles.Where(x => x.Permission != null).Select(x => x.Permission).ToHashSet();
                    foreach (var permission in permissions)
                    {
                        if (!permissionSet.Contains(permission))
                        {
                            db.Insert(new UserAuthRole
                            {
                                UserAuthId = userAuth.Id,
                                Permission = permission,
                                CreatedDate = now,
                                ModifiedDate = now,
                            });
                        }
                    }
                }
            }
        }

        public void UnAssignRoles(string userAuthId, ICollection<string> roles = null, ICollection<string> permissions = null)
        {
            var userAuth = GetUserAuth(userAuthId);
            using (var db = dbFactory.Open())
            {
                if (!roles.IsEmpty())
                {
                    db.Delete<UserAuthRole>(q => q.UserAuthId == userAuth.Id && roles.Contains(q.Role));
                }
                if (!permissions.IsEmpty())
                {
                    db.Delete<UserAuthRole>(q => q.UserAuthId == userAuth.Id && permissions.Contains(q.Permission));
                }
            }
        }
    }
}