"use strict";
var nodegit = require("nodegit");
var path = require("path");
var config = require("./config");

var repoDir = config.repoDir;
var sshPublicKey = path.resolve(config.sshPublicKey);
var sshPrivateKey = path.resolve(config.sshPrivateKey);

var repository;

function createCred() {
    return nodegit.Cred.sshKeyNew(
        "git",
        sshPublicKey,
        sshPrivateKey,
        ""
    );
}

module.exports = function (callback) {
// Open a repository that needs to be fetched and fast-forwarded
    nodegit.Repository.open(path.resolve(__dirname, repoDir))
        .then(function (repo) {
            repository = repo;

            return repository.fetchAll({
                credentials: createCred
            }, true);
        })
        // Now that we're finished fetching, go ahead and merge our local branch
        // with the new one
        .then(function () {
            return repository.mergeBranches("master", "origin/master");
        })
        .then(function () {
            var checkoutOptions = new nodegit.CheckoutOptions();
            checkoutOptions.checkoutStrategy = 4;
            return nodegit.Checkout.head(repository, checkoutOptions);
        })
        .done(function () {
            console.log("pull complete");
            callback();
        });

};