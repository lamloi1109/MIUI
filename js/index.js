var firebaseConfig = {
    apiKey: "AIzaSyDPnHMJBiwV1icR3xMBgt7xiDNw_vlzIBk",
    authDomain: "keygen-6a75c.firebaseapp.com",
    databaseURL: "https://keygen-6a75c-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "keygen-6a75c",
    storageBucket: "keygen-6a75c.appspot.com",
    messagingSenderId: "451509128477",
    appId: "1:451509128477:web:f520766b52fab8783a25f4",
    measurementId: "G-BTWPSGJ44J"
};


var firebaseConfig2 = {
    apiKey: "AIzaSyC0VS77pYUR11vhoY3H-JDFpJZUDxzIrLc",
    authDomain: "mcvs-debug.firebaseapp.com",
    databaseURL: "https://mcvs-debug-default-rtdb.firebaseio.com",
    projectId: "mcvs-debug",
    storageBucket: "mcvs-debug.appspot.com",
    messagingSenderId: "137834200981",
    appId: "1:137834200981:web:5abc25a01b2a8cd47e809c",
    measurementId: "G-34T38LV25B"
};

const secondApp = firebase.initializeApp(firebaseConfig2, 'Secondary');




firebase.initializeApp(firebaseConfig);
firebase.auth().onAuthStateChanged((user) => {

    if (user) {
        var str = user.email.split("@")
        document.getElementById("user").innerHTML = str[0];
        var userId = firebase.auth().currentUser.uid;
        firebase.database().ref('/user/' + userId).once('value').then((snapshot) => {
            document.getElementById("credit").innerHTML = snapshot.val().credit;
        });

        console.log(user.email)
        firebase.database().ref('/user/' + userId).child("isAdmin").once('value').then((snapshot) => {
        const userData = snapshot.val();
        if (userData) {
            window.location = "admin.html"
        }
    });

    }
    else {
        window.location = "login.html";
    }
});

let getkey = document.getElementById("getkey")
getkey.addEventListener("click", (e) => {
    //Prevent Default Form Submission Behavior
    e.preventDefault()
    var MacAddress = document.getElementById("typeText").value
    if ( ! MacAddress) {
        if (confirm("Empty token ?") == true) {
        comfirm()
    }
    }
    else comfirm()

})


let signOutButton = document.getElementById("signout")
signOutButton.addEventListener("click", (e) => {
    //Prevent Default Form Submission Behavior
    e.preventDefault()
    console.log("clicked")

    firebase.auth().signOut()
    alert("Signed Out")
    window.location = "login.html";
})

// program to reverse a string

function reverseString(str) {

    // empty string
    let newString = "";
    for (let i = str.length - 1; i >= 0; i--) {
        newString += str[i];
    }
    return newString;
}



function comfirm() {
    let text = "Credit is not refundable !.";
    if (confirm(text) == true) {
        var userId = firebase.auth().currentUser.uid;
        firebase.database().ref('/user/' + userId).once('value').then((snapshot) => {
            const current_credit = snapshot.val().credit
            if (snapshot.val().credit > 0) {
                var MacAddress = document.getElementById("typeText").value
                var author = document.getElementById("user").innerHTML
                let device = MacAddress.split(".");
                const d = new Date();
                let prefix1 = ""
                let prefix2 = ""
                let expire = 30
                const CurrDay = d.getDate();
                if (CurrDay < 10) {
                    prefix1 = "0"
                }
                const CurrMonth = d.getMonth() + 1;
                if (CurrMonth < 10) {
                    prefix2 = "0"
                }
                const CurrYear = d.getFullYear();
                const used_credit = current_credit - 1
                firebase.database().ref('/user/' + userId).update({
                    credit: used_credit ,
                    email: firebase.auth().currentUser.email
                });
                // Create Base64 Object
                var Base64 = {
                    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
                    encode: function(e) {
                        var t = "";
                        var n, r, i, s, o, u, a;
                        var f = 0;
                        e = Base64._utf8_encode(e);
                        while (f < e.length) {
                            n = e.charCodeAt(f++);
                            r = e.charCodeAt(f++);
                            i = e.charCodeAt(f++);
                            s = n >> 2;
                            o = (n & 3) << 4 | r >> 4;
                            u = (r & 15) << 2 | i >> 6;
                            a = i & 63;
                            if (isNaN(r)) {
                                u = a = 64
                            } else if (isNaN(i)) {
                                a = 64
                            }
                            t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a)
                        }
                        return t
                    },
                    decode: function(e) {
                        var t = "";
                        var n, r, i;
                        var s, o, u, a;
                        var f = 0;
                        e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "");
                        while (f < e.length) {
                            s = this._keyStr.indexOf(e.charAt(f++));
                            o = this._keyStr.indexOf(e.charAt(f++));
                            u = this._keyStr.indexOf(e.charAt(f++));
                            a = this._keyStr.indexOf(e.charAt(f++));
                            n = s << 2 | o >> 4;
                            r = (o & 15) << 4 | u >> 2;
                            i = (u & 3) << 6 | a;
                            t = t + String.fromCharCode(n);
                            if (u != 64) {
                                t = t + String.fromCharCode(r)
                            }
                            if (a != 64) {
                                t = t + String.fromCharCode(i)
                            }
                        }
                        t = Base64._utf8_decode(t);
                        return t
                    },
                    _utf8_encode: function(e) {
                        e = e.replace(/\r\n/g, "\n");
                        var t = "";
                        for (var n = 0; n < e.length; n++) {
                            var r = e.charCodeAt(n);
                            if (r < 128) {
                                t += String.fromCharCode(r)
                            } else if (r > 127 && r < 2048) {
                                t += String.fromCharCode(r >> 6 | 192);
                                t += String.fromCharCode(r & 63 | 128)
                            } else {
                                t += String.fromCharCode(r >> 12 | 224);
                                t += String.fromCharCode(r >> 6 & 63 | 128);
                                t += String.fromCharCode(r & 63 | 128)
                            }
                        }
                        return t
                    },
                    _utf8_decode: function(e) {
                        var t = "";
                        var n = 0;
                        var r = c1 = c2 = 0;
                        while (n < e.length) {
                            r = e.charCodeAt(n);
                            if (r < 128) {
                                t += String.fromCharCode(r);
                                n++
                            } else if (r > 191 && r < 224) {
                                c2 = e.charCodeAt(n + 1);
                                t += String.fromCharCode((r & 31) << 6 | c2 & 63);
                                n += 2
                            } else {
                                c2 = e.charCodeAt(n + 1);
                                c3 = e.charCodeAt(n + 2);
                                t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
                                n += 3
                            }
                        }
                        return t
                    }
                }
                //let final = mytime.concat(CurrDay, MacAddress, CurrMonth, ".", CurrYear);
                let final = device[2] + "." + prefix1 + CurrDay.toString() + "." + prefix2 + CurrMonth.toString() + "." + CurrYear.toString() + "." + "60" + "." +  device[1] + "." + author
                var encodedString = Base64.encode(final);
                const result = reverseString(encodedString);
                document.getElementById("formControlReadonly").value = result
                document.getElementById("credit").innerHTML = used_credit
                firebase.database().ref('user/' + userId + '/history/' + Date.now()).update({
                    serial: device[1],
                    user_token: MacAddress,
                    keygen: result,
                    crrt_crd: used_credit,
                    "device" : device[2]
                });
            }
            else {
              document.getElementById("formControlReadonly").value = "Out of credit, please buy more !"
            }
        });

    }
    var userId = firebase.auth().currentUser.uid;
    firebase.database().ref('/user/' + userId).update({credit: used_credit });
    firebase.database().ref('/user/' + userId).update({email: firebase.auth().currentUser.email });

}




function cptext(uid) {
  /* Copy the text inside the text field */
  navigator.clipboard.writeText(uid);
  
}


let getUID = document.getElementById("uids")
getUID.addEventListener("click", (e) => {
    //Prevent Default Form Submission Behavior
    e.preventDefault()
    console.log("clicked")
    var userId = firebase.auth().currentUser.uid;
    cptext(userId)
    document.getElementById("uids").innerHTML = "Copied"
})


function getts(da, mon, yea) {
    date = new Date(yea, mon - 1, da , "00", "00");
    return date.getTime()
}


let savepass = document.getElementById("savepass")
savepass.addEventListener("click", (e) => {
    //Prevent Default Form Submission Behavior
    e.preventDefault()

    const user = firebase.auth().currentUser;
    const userId = firebase.auth().currentUser.uid;
    const oldPassword = document.getElementById("oldp").value
    const newPassword = document.getElementById("newp").value
    const secretkey = document.getElementById("sck").value

    const credential = firebase.auth.EmailAuthProvider.credential(
        user.email, 
        oldPassword
    );
    // Now you can use that to reauthenticate
    user.reauthenticateWithCredential(credential).then(() => {
        firebase.database().ref('/user/' + userId).once('value').then((snapshot) => {
            const current_sr = snapshot.val().secret
            if (current_sr == secretkey ) {
                user.updatePassword(newPassword).then(() => {
                    const toolbox_user = user.email.split("@")[0]
                        secondApp.database().ref("ROM/KTV").update({
                            [toolbox_user] : newPassword,
                        });
                    console.log("Update successful")
                    alert("Your password is updated !");
                }).catch((error) => {
                    console.log(error.code)
                    alert(error.message)
                    // ..
                  })
            } else {
                alert("Wrong Secret key !");
            }
        })
    }).catch((error) => {
        console.log(error.code)
        alert(error.message)
        // ..
      });

})
1