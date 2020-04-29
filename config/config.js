let appconfig = {}

appconfig.port = 3000;
appconfig.allowedCorsOrigin = "*";
appconfig.env = "dev";
appconfig.db = {
    uri :"mongodb://127.0.0.1:27017/ed"
};
appconfig.version = "0.0.1"

module.exports = {
    port: appconfig.port,
    allowedCorsOrigin: appconfig.allowedCorsOrigin,
    env: appconfig.env,
    db: appconfig.db,
    version: appconfig.version
}