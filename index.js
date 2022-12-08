const fs = require("fs");
const superagent = require("superagent");

const readFilePro = (file) => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) reject("I could not find that file");
            resolve(data);
        });
    });
};

const writeFilePro = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, (err) => {
            if (err) reject("I could not find that file");
            resolve("success");
        });
    });
};

readFilePro(`${__dirname}/dog.txt`)
    .then((data) => {
        console.log(`Breed: ${data}`);

        return superagent.get(
            `https://dog.ceo/api/breed/${data}/images/random`
        );
    })
    .then((res) => {
        console.log(res.body.message);

        return writeFilePro("dog-image.txt", res.body.message)

        // fs.writeFile("dog-image.txt", res.body.message, (err) => {
        //     console.log("Random dog image saved");
        // });
    })
    .then(()=>{
        console.log("Random dog image saved");
    })
    .catch((err) => {
        console.log(err);
    });
