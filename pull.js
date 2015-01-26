"use strict";
var nodegit = require("nodegit");
var path = require("path");

var repoDir = "../situp-backend-central/";
var sshPublicKey = path.resolve("./id_rsa.pub");
var sshPrivateKey = path.resolve("./id_rsa");

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
            repository.mergeBranches("master", "origin/master");
        })
        .then(function () {
            nodegit.Checkout.head(repository);
        })
        .done(function () {
            callback();
        });

};