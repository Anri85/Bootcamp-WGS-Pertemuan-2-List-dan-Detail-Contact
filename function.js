const fs = require("fs");
const validator = require("validator");

// menentukan lokasi file disimpan (folder dan nama file)
const path = "./data";
const file = "./data/contact.json";
// jika file tidak ada maka buat baru
if (!fs.existsSync(path)) fs.mkdirSync(path);
if (!fs.existsSync(file)) fs.writeFileSync(file, "[]");

const loadContact = () => {
    const data = fs.readFileSync(file, "utf-8");
    const contacts = JSON.parse(data);
    return contacts;
};

// fungsi menyimpan data pada file contact.json
const saveData = (name, email, mobile) => {
    const errDump = [];
    const contact = { name, email, mobile };
    const contactList = loadContact();
    const duplicate = contactList.find((cl) => cl.name === name);

    // validasi input data
    if (duplicate) {
        errDump.push("Nama sudah digunakan. Tolong pilih yang lain");
    }
    if (email) {
        if (!validator.isEmail(email)) {
            errDump.push("Tolong masukan email yang valid");
        }
    }
    if (!validator.isMobilePhone(mobile, "id-ID")) {
        errDump.push("Tolong masukan nomor yang valid");
    }
    if (errDump.length > 0) {
        console.log(errDump);
        return false;
    }
    contactList.push(contact);
    fs.writeFileSync(file, JSON.stringify(contactList));
    console.log("Terima kasih informasinya");
};

const listContact = () => {
    const contactList = loadContact();
    console.log("Daftar Kontak: ");
    contactList.forEach((cl, i) => {
        console.log(`${i + 1}, ${cl.name}: ${cl.mobile}`);
    });
};

const detailContact = (name) => {
    const contacts = loadContact();
    const detailContact = contacts.find((dc) => dc.name === name);
    if (detailContact) {
        console.log(detailContact.name);
        console.log(detailContact.email);
        console.log(detailContact.mobile);
    } else {
        console.log("Kontak tidak ditemukan");
    }
};

module.exports = { saveData, listContact, detailContact };
