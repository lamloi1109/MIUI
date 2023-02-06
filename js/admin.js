var firebaseConfig1 = {
  apiKey: "AIzaSyDPnHMJBiwV1icR3xMBgt7xiDNw_vlzIBk",
  authDomain: "keygen-6a75c.firebaseapp.com",
  databaseURL:
    "https://keygen-6a75c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "keygen-6a75c",
  storageBucket: "keygen-6a75c.appspot.com",
  messagingSenderId: "451509128477",
  appId: "1:451509128477:web:f520766b52fab8783a25f4",
  measurementId: "G-BTWPSGJ44J",
};

var firebaseConfig2 = {
  apiKey: "AIzaSyC0VS77pYUR11vhoY3H-JDFpJZUDxzIrLc",
  authDomain: "mcvs-debug.firebaseapp.com",
  databaseURL: "https://mcvs-debug-default-rtdb.firebaseio.com",
  projectId: "mcvs-debug",
  storageBucket: "mcvs-debug.appspot.com",
  messagingSenderId: "137834200981",
  appId: "1:137834200981:web:5abc25a01b2a8cd47e809c",
  measurementId: "G-34T38LV25B",
};

const mainApp = firebase.initializeApp(firebaseConfig1);
const secondApp = firebase.initializeApp(firebaseConfig2, "Secondary");

var auth = mainApp.auth();

var uid = document.getElementById("UID").innerHTML;

var itemsRef1 = mainApp.database().ref().child("user");

var fst;
var fin;
var fstd;
var find;
var initi = 0;
var test = 0;

let signOutButton = document.getElementById("signout");
signOutButton.addEventListener("click", (e) => {
  //Prevent Default Form Submission Behavior
  e.preventDefault();
  console.log("clicked");

  mainApp.auth().signOut();
  alert("Signed Out");
  window.location = "login.html";
});

let checkButton = document.getElementById("check");
checkButton.addEventListener("click", (e) => {
  //Prevent Default Form Submission Behavior
  e.preventDefault();

  emeo = document.getElementById("typeEmail").value;

  if (emeo) {
    document.getElementById("table1").innerHTML = "";
    document.getElementById("thead").innerHTML = "";
    itemsRef1
      .orderByChild("email")
      .equalTo(emeo)
      .on("value", function (snapshot) {
        snapshot.forEach(function (data) {
          let UIDD = data.key;
          document.getElementById("UID").innerHTML = UIDD;
          document.getElementById("credit").innerHTML = data.val().credit;
          alldata(UIDD, "normal");
          const d = fstd;
          let prefix1d = "";
          let prefix2d = "";
          const CurrDayd = d.getDate();
          if (CurrDayd < 10) {
            prefix1d = "0";
          }
          const CurrMonthd = d.getMonth() + 1;
          if (CurrMonthd < 10) {
            prefix2d = "0";
          }
          const CurrYeard = d.getFullYear();

          const f = find;
          let prefix1f = "";
          let prefix2f = "";
          const CurrDayf = f.getDate();
          if (CurrDayf < 10) {
            prefix1f = "0";
          }
          const CurrMonthf = f.getMonth() + 1;
          if (CurrMonthf < 10) {
            prefix2f = "0";
          }
          const CurrYearf = f.getFullYear();

          let TotalDays = Math.ceil((fin - fst) / (1000 * 3600 * 24));
          document.getElementById("day").innerHTML = "in " + TotalDays + " day";
          document.getElementById("sum").innerHTML =
            "Used key : " + document.getElementById("table1").rows.length;
          document.getElementById("start").value =
            CurrYeard + "-" + prefix2d + CurrMonthd + "-" + prefix1d + CurrDayd;
          document.getElementById("end").value =
            CurrYearf + "-" + prefix2f + CurrMonthf + "-" + prefix1f + CurrDayf;
        });
      });
  } else {
    document.getElementById("day").innerHTML = 0;
    document.getElementById("sum").innerHTML = 0;
    document.getElementById("table1").innerHTML = "";
    document.getElementById("thead").innerHTML = "";
    lstuser();
    document.getElementById("table1").innerHTML = "";
  }
});

let exxcel = document.getElementById("Excel");
exxcel.addEventListener("click", (e) => {
  //Prevent Default Form Submission Behavior
  e.preventDefault();
  excel();
  console.log("OK");
});

function AddItemsToTable(time, random, seria, key) {
  var tbody = document.getElementById("table1");
  var trow = document.createElement("tr");
  var td1 = document.createElement("td");
  var td2 = document.createElement("td");
  var td3 = document.createElement("td");
  var td4 = document.createElement("td");

  td1.innerHTML += `<h6><p class="badge badge-secondary">${time}</p></h6>`;
  td2.innerHTML += `<h6><p class="badge badge-info rounded-pill">${random}</p></h6>`;
  td3.innerHTML += `<h6><p class="badge badge-warning rounded-pill">${seria}</p></h6>`;
  td4.innerHTML += `<h6><p class="badge badge-success">${key}</p></h6>`;
  if (time.includes("@gmail.com")) {
    td1.setAttribute("data-label", "Mail");
    td2.setAttribute("data-label", "Credit");
    td3.setAttribute("data-label", "IsAdmin");
    td4.setAttribute("data-label", "UID");
  } else {
    td1.setAttribute("data-label", "Time");
    td2.setAttribute("data-label", "Device");
    td3.setAttribute("data-label", "Serial");
    td4.setAttribute("data-label", "Key");
  }
  trow.appendChild(td1);
  trow.appendChild(td2);
  trow.appendChild(td3);
  trow.appendChild(td4);
  tbody.appendChild(trow);
}

function alldata(uid, mode, sd, ed) {
  var a = document.getElementById("thead");
  var row1 = document.createElement("tr");
  var head1 = document.createElement("th");
  var head2 = document.createElement("th");
  var head3 = document.createElement("th");
  var head4 = document.createElement("th");
  head1.innerText = "Time";
  head2.innerText = "Device";
  head3.innerText = "Serial";
  head4.innerText = "Key";
  row1.appendChild(head1);
  row1.appendChild(head2);
  row1.appendChild(head3);
  row1.appendChild(head4);
  a.appendChild(row1);
  mainApp
    .database()
    .ref()
    .child("user/" + uid + "/history")
    .once("value", function (AllRecords) {
      AllRecords.reverse().forEach(function (CurrentRecord) {
        var tk = CurrentRecord.val().user_token;

        var rd = CurrentRecord.val().device;
        var srn = CurrentRecord.val().serial;
        var key = CurrentRecord.val().keygen;
        var time = new Date(CurrentRecord.key * 1).toLocaleString("vi-VN");
        if (mode == "normal") {
          AddItemsToTable(time, rd, srn, key);
          if (initi == 0) {
            fst = CurrentRecord.key;
            fstd = new Date(CurrentRecord.key * 1);
          }
          fin = CurrentRecord.key;
          find = new Date(CurrentRecord.key * 1);
          initi = initi + 1;
        } else {
          if (mode == "sbd") {
            if (CurrentRecord.key >= sd && CurrentRecord.key <= ed) {
              AddItemsToTable(time, rd, srn, key);
              if (initi == 0) {
                fst = CurrentRecord.key;
                fstd = new Date(CurrentRecord.key * 1);
              }
              fin = CurrentRecord.key;
              find = new Date(CurrentRecord.key * 1);
              initi = initi + 1;
            }
          }
        }
      });
    });
}

function excel() {
  var table2excel = new Table2Excel();
  table2excel.export(document.querySelectorAll("table.table"));
}

function cptext(uid) {
  /* Copy the text inside the text field */
  navigator.clipboard.writeText(uid);
  console.log(uid);
}

let getUID = document.getElementById("UID");
getUID.addEventListener("click", (e) => {
  //Prevent Default Form Submission Behavior
  e.preventDefault();
  cptext(document.getElementById("UID").innerHTML);
});

function getts(da, mon, yea) {
  date = new Date(yea, mon, da, "23", "59");
  return date.getTime();
}

let sort = document.getElementById("sbd");
sort.addEventListener("click", (e) => {
  //Prevent Default Form Submission Behavior
  e.preventDefault();
  document.getElementById("table1").innerHTML = "";
  document.getElementById("thead").innerHTML = "";
  test = 0;
  initi = 0;
  var UIDD = document.getElementById("UID").innerHTML;
  nbd = new Date(document.getElementById("start").value).valueOf();
  nkt = new Date(document.getElementById("end").value);
  var testm = nkt.getMonth() + 1;
  if (testm < 10) {
    var tt = "0";
  } else {
    var tt = "";
  }
  test = getts(nkt.getDate(), tt + testm, nkt.getFullYear());
  alldata(UIDD, "sbd", nbd, test);
  let TotalDays = Math.ceil((find - fstd) / (1000 * 3600 * 24));
  document.getElementById("day").innerHTML = "in " + TotalDays + " day";
  document.getElementById("sum").innerHTML =
    "Used key : " + document.getElementById("table1").rows.length;
});

let save = document.getElementById("save");
save.addEventListener("click", (e) => {
  //Prevent Default Form Submission Behavior
  e.preventDefault();
  credit = document.getElementById("credit").innerHTML;
  uid = document.getElementById("UID").innerHTML;
  alert("Update credit ?");
  mainApp
    .database()
    .ref("/user/" + uid)
    .update({
      credit: credit,
    });
});

function lstuser() {
  var a = document.getElementById("thead");
  var row1 = document.createElement("tr");
  var head1 = document.createElement("th");
  var head2 = document.createElement("th");
  var head3 = document.createElement("th");
  var head4 = document.createElement("th");
  head1.innerText = "Mail";
  head2.innerText = "Credit";
  head3.innerText = "IsAdmin";
  head4.innerText = "UID";
  row1.appendChild(head1);
  row1.appendChild(head2);
  row1.appendChild(head3);
  row1.appendChild(head4);
  a.appendChild(row1);
  mainApp
    .database()
    .ref()
    .child("user")
    .once("value", function (AllRecords) {
      AllRecords.forEach(function (CurrentRecord) {
        var mail = CurrentRecord.val().email;
        var cd = CurrentRecord.val().credit;
        var ad = CurrentRecord.val().isAdmin;
        console.log(CurrentRecord.val());

        var uid = CurrentRecord.key;
        AddItemsToTable(mail, cd, ad, uid);
      });
    });
}

function comfirm() {
  var MacAddress = document.getElementById("typeText").value;
  var exp = document.getElementById("exp").value;
  var coin = document.getElementById("coin").value;
  var author = "admin";
  let device = MacAddress.split(".");
  const d = new Date();
  let prefix1 = "";
  let prefix2 = "";
  const CurrDay = d.getDate();
  if (CurrDay < 10) {
    prefix1 = "0";
  }
  const CurrMonth = d.getMonth() + 1;
  if (CurrMonth < 10) {
    prefix2 = "0";
  }
  const CurrYear = d.getFullYear();
  // Create Base64 Object
  var Base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
    encode: function (e) {
      var t = "";
      var n, r, i, s, o, u, a;
      var f = 0;
      e = Base64._utf8_encode(e);
      while (f < e.length) {
        n = e.charCodeAt(f++);
        r = e.charCodeAt(f++);
        i = e.charCodeAt(f++);
        s = n >> 2;
        o = ((n & 3) << 4) | (r >> 4);
        u = ((r & 15) << 2) | (i >> 6);
        a = i & 63;
        if (isNaN(r)) {
          u = a = 64;
        } else if (isNaN(i)) {
          a = 64;
        }
        t =
          t +
          this._keyStr.charAt(s) +
          this._keyStr.charAt(o) +
          this._keyStr.charAt(u) +
          this._keyStr.charAt(a);
      }
      return t;
    },
    decode: function (e) {
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
        n = (s << 2) | (o >> 4);
        r = ((o & 15) << 4) | (u >> 2);
        i = ((u & 3) << 6) | a;
        t = t + String.fromCharCode(n);
        if (u != 64) {
          t = t + String.fromCharCode(r);
        }
        if (a != 64) {
          t = t + String.fromCharCode(i);
        }
      }
      t = Base64._utf8_decode(t);
      return t;
    },
    _utf8_encode: function (e) {
      e = e.replace(/\r\n/g, "\n");
      var t = "";
      for (var n = 0; n < e.length; n++) {
        var r = e.charCodeAt(n);
        if (r < 128) {
          t += String.fromCharCode(r);
        } else if (r > 127 && r < 2048) {
          t += String.fromCharCode((r >> 6) | 192);
          t += String.fromCharCode((r & 63) | 128);
        } else {
          t += String.fromCharCode((r >> 12) | 224);
          t += String.fromCharCode(((r >> 6) & 63) | 128);
          t += String.fromCharCode((r & 63) | 128);
        }
      }
      return t;
    },
    _utf8_decode: function (e) {
      var t = "";
      var n = 0;
      var r = (c1 = c2 = 0);
      while (n < e.length) {
        r = e.charCodeAt(n);
        if (r < 128) {
          t += String.fromCharCode(r);
          n++;
        } else if (r > 191 && r < 224) {
          c2 = e.charCodeAt(n + 1);
          t += String.fromCharCode(((r & 31) << 6) | (c2 & 63));
          n += 2;
        } else {
          c2 = e.charCodeAt(n + 1);
          c3 = e.charCodeAt(n + 2);
          t += String.fromCharCode(
            ((r & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63)
          );
          n += 3;
        }
      }
      return t;
    },
  };
  //let final = mytime.concat(CurrDay, MacAddress, CurrMonth, ".", CurrYear);

  let final =
    device[2] +
    "." +
    prefix1 +
    CurrDay.toString() +
    "." +
    prefix2 +
    CurrMonth.toString() +
    "." +
    CurrYear.toString() +
    "." +
    exp.toString() +
    "." +
    device[1] +
    "." +
    author;
  var encodedString = Base64.encode(final);
  const result = reverseString(encodedString);

  if (exp != "360") {
    document.getElementById("formControlReadonly").value = result;
  } else {
    document.getElementById("formControlReadonly").value =
      "360 Day option, No key provided";
  }

  var userId = mainApp.auth().currentUser.uid;
  mainApp
    .database()
    .ref("user/" + userId + "/history/" + Date.now())
    .update({
      serial: device[1],
      user_token: MacAddress,
      keygen: result,
      crrt_crd: "admin_key",
      coin: coin,
      expire: exp,
      device: device[2],
    });

  if (document.getElementById("active").checked) {
    console.log("active");
    secondApp
      .database()
      .ref("ROM/MIUIVS/" + device[1])
      .update({
        bought: true,
        buy_date:
          prefix1 +
          CurrDay.toString() +
          "/" +
          prefix2 +
          CurrMonth.toString() +
          "/" +
          CurrYear.toString(),
        expire: exp,
        coin: coin,
        device: device[2],
      });
  } else {
    console.log("add coin");
    secondApp
      .database()
      .ref("ROM/MIUIVS/" + device[1])
      .update({
        coin: coin,
        device: device[2],
      });
  }
}

function reverseString(str) {
  // empty string
  let newString = "";
  for (let i = str.length - 1; i >= 0; i--) {
    newString += str[i];
  }
  return newString;
}

let getkey = document.getElementById("getkey");
getkey.addEventListener("click", (e) => {
  //Prevent Default Form Submission Behavior
  e.preventDefault();
  var userId = mainApp.auth().currentUser.uid;
  mainApp
    .database()
    .ref("/user/" + userId)
    .child("isAdmin")
    .once("value")
    .then((snapshot) => {
      const userData = snapshot.val();
      if (userData) {
        var MacAddress = document.getElementById("typeText").value;
        if (!MacAddress) {
          if (confirm("Empty token ?") == true) {
            comfirm();
          }
        } else comfirm();
      }
    });
});

let getacc = document.getElementById("getacc");
getacc.addEventListener("click", (e) => {
  //Prevent Default Form Submission Behavior
  e.preventDefault();

  const Email = document.getElementById("userEmail").value;
  const Credit = document.getElementById("typeNumber").value;

  var chars =
    "0123456789abcdefghijklmnopqrstuvwxyz!@#$%&ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var passwordLength = 12;
  var Password = "";
  var SCKength = 30;
  var SCK = "";

  for (var i = 0; i <= passwordLength; i++) {
    var randomNumber = Math.floor(Math.random() * chars.length);
    Password += chars.substring(randomNumber, randomNumber + 1);
  }

  for (var i = 0; i <= SCKength; i++) {
    var randomNumber = Math.floor(Math.random() * chars.length);
    SCK += chars.substring(randomNumber, randomNumber + 1);
  }

  document.getElementById("userPasswd").value = Password;
  document.getElementById("secretkey").value = SCK;

  firebase
    .auth()
    .createUserWithEmailAndPassword(Email, Password)
    .then((userCredential) => {
      // Signed in
      var userId = userCredential.user.uid;
      firebase
        .database()
        .ref("user/" + userId)
        .set({
          credit: Credit,
          email: Email,
          isAdmin: false,
          secret: SCK,
        });
      const toolbox_user = Email.split("@")[0];
      if (document.getElementById("syncToolbox").checked) {
        secondApp
          .database()
          .ref("ROM/KTV")
          .update({
            [toolbox_user]: Password,
          });
      }
      alert("Success !Admin account will be logout, re-login to use. It bug");
    })
    .catch((error) => {
      console.log(error.code);
      alert(error.message);
    });
});

let acccg = document.getElementById("acccg");
acccg.addEventListener("click", (e) => {
  //Prevent Default Form Submission Behavior
  e.preventDefault();
  document.getElementById("typeNumber").value = 0;
  document.getElementById("userEmail").value = " ";
});

function caldate(date1, op) {
  let date_1 = new Date(date1);
  let date_2 = new Date();

  let difference = date_2.getTime() - date_1.getTime();
  let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
  return op - TotalDays;
}

function format(year, month, date) {
  return `${month}/${date}/${year}`;
}

let cccc = document.getElementById("checkcc");
cccc.addEventListener("click", (e) => {
  //Prevent Default Form Submission Behavior
  e.preventDefault();
  document.getElementById("cdcoin").value = 0;
  document.getElementById("cdday").value = 0;
  var token = document.getElementById("gettoken").value.split(".")[1];
  var getdata = secondApp.database().ref("ROM/MIUIVS/" + token);
  getdata.on("value", (snapshot) => {
    const data = snapshot.val();

    document.getElementById("getdevice").value = "Device : " + data.device;
    document.getElementById("getdate").value = "Buy date : " + data.buy_date;
    document.getElementById("getop").value = "Option : " + data.expire;
    document.getElementById("getcoin").value = "Coin : " + data.coin;
    document.getElementById("author").innerHTML = "Author : " + data.author;
    document.getElementById("getexpire").value =
      "Remain : " +
      caldate(
        format(
          data.buy_date.split("/")[2],
          data.buy_date.split("/")[1],
          data.buy_date.split("/")[0]
        ),
        data.expire
      );
  });
});

let doevent = document.getElementById("doevent");
doevent.addEventListener("click", (e) => {
  //Prevent Default Form Submission Behavior
  e.preventDefault();

  var token = document.getElementById("gettoken").value.split(".")[1];
  var getdata = secondApp.database().ref("ROM/MIUIVS/" + token);

  getdata.once("value").then((snapshot) => {
    const data = snapshot.val();

    if (!data.TET2023) {
      if (parseInt(data.expire) > 1) {
        secondApp
          .database()
          .ref("ROM/MIUIVS/" + token)
          .update({
            expire: Math.ceil(parseInt(data.expire) + 15),
            TET2023: "Join",
          });

        $("#eventmodal").modal("hide");
        $("#ok").modal("show");
        document.getElementById("ser_cc").innerHTML = "Token : " + token;
        document.getElementById("nsd").innerHTML =
          "Thá»i háº¡n sá»­ dá»¥ng : " +
          caldate(
            format(
              data.buy_date.split("/")[2],
              data.buy_date.split("/")[1],
              data.buy_date.split("/")[0]
            ),
            data.expire
          ) +
          " + 15 ngÃ y";

        secondApp
          .database()
          .ref("ROM/Event/TET2023/" + token)
          .update({
            Join: Date.now(),
          });
      }
    } else {
      alert("ÄÃ£ tham gia sá»± kiá»‡n TET2023 !");
    }
  });
});

let congdon = document.getElementById("congdon");
congdon.addEventListener("click", (e) => {
  //Prevent Default Form Submission Behavior
  e.preventDefault();

  var token = document.getElementById("gettoken").value.split(".")[1];
  var getdata = secondApp.database().ref("ROM/MIUIVS/" + token);
  var addcoin = document.getElementById("cdcoin").value;
  var addday = document.getElementById("cdday").value;

  getdata.once("value").then((snapshot) => {
    const data = snapshot.val();
    console.log(data.expire, addcoin);

    secondApp
      .database()
      .ref("ROM/MIUIVS/" + token)
      .update({
        expire: Math.ceil(parseInt(data.expire) + parseInt(addday)),
        coin: Math.ceil(parseInt(data.coin) + parseInt(addcoin)),
      });

    alert("Add " + addcoin + " coin and " + addday + " day to " + token);
  });
});

let blockip = document.getElementById("blockip");
blockip.addEventListener("click", (e) => {
  //Prevent Default Form Submission Behavior
  e.preventDefault();

  var token = document.getElementById("gettoken").value.split(".")[1];
  var getdata = secondApp.database().ref("ROM/MIUIVS/" + token);

  getdata.once("value").then((snapshot) => {
    const data = snapshot.val();

    secondApp
      .database()
      .ref("ROM/Block/MAC")
      .update({
        [data.mac]: true,
      });

    alert("Block : " + token + "\n" + "Mac address : " + data.mac);
  });
});

window.onload = lstuser;
1;
