let app = new Vue({
  el: "#app",
  data: {
    contacts: [
      {
        name: "Alberto Dore",
        avatar: "assets/img/avatar-albed.jpg",
        visible: true,
        active: false,
        status: "Ultimo accesso il 19/08/2022 alle 12:38",
        options: false,
        messages: [
          {
            text: "Possiamo andare a mangiare?",
            date: "19/08/2022 12:58",
            status: "received",
            openMessageOption: false,
          },
        ],
      },
      {
        name: "Nigel D. Nella",
        avatar: "assets/img/avatar-nigel.jpg",
        visible: true,
        active: false,
        options: false,
        status: "Ultimo accesso il 16/08/2022 alle 05:40",
        messages: [
          {
            text: "Nigel ma sei ancora sveglio?",
            date: "12/08/2022 02:01",
            status: "sent",
            openMessageOption: false,
          },
          {
            text: "Il mio mental è gone",
            date: "12/08/2022 02:02",
            status: "received",
            openMessageOption: false,
          },
        ],
      },
      {
        name: "Alberto Sorrentino",
        avatar: "assets/img/avatar-albes.jpg",
        visible: true,
        active: false,
        options: false,
        status: "Ultimo accesso il 15/08/2022 alle 10:14",
        messages: [
          {
            text: "FILIPPO LA DEVI SMETTERE DI PORTARMI SFIGA, TU E LE TUE PROFEZIE",
            date: "22/08/2022 08:38",
            status: "received",
            openMessageOption: false,
          },
        ],
      },
      {
        name: "Francesco Pieraccini",
        avatar: "assets/img/avatar-fra.jpeg",
        visible: true,
        active: false,
        options: false,
        status: "Ultimo accesso il 14/08/2022 alle 13:41",
        messages: [
          {
            text: "Sto creando un array per triangolare la posizione del pentagono",
            date: "3/08/2022 13:27",
            status: "received",
            openMessageOption: false,
          },
        ],
      },
      {
        name: "Irinel Momoloaca",
        avatar: "assets/img/avatar-irinel.jpg",
        visible: true,
        active: false,
        options: false,
        status: "Ultimo accesso il 31/12/2077 alle 23:59",
        messages: [
          {
            text: "*Strani versi in PHP*",
            date: "31/12/2077 23:15",
            status: "received",
            openMessageOption: false,
          },
        ],
      },
    ],
    appLoading: true,
    focus: -1,
    inputMessage: "",
    inputSearch: "",
    hiddenClass: false,
    introImg: "assets/img/intro.jpg",
    newChatPopup: false,
    newContactName: "",
    newContactAvatar: "",
    answersArr: [
      "Ok",
      "Io ridefinisco l'hotel inflazionato ma oggi Diego e Viola gareggiano l'attaccante vulcanizzabile.",
      "Anna grida la laurea kazaka siccome Samuele conta i corpi socialdemocratici.",
      "Io pedalo le distanze ovest tanto che Ignazio veglia l'equipaggio uguale.",
      "Il diritto è l'album marcio delle etiche inseparabili e soltanto il tempo può darci ragione.",
      "Noi privatizziamo la sede illusoria intanto che tu inondi gli isolamenti gravidi.",
    ],
  },
  methods: {
    changeChat: function (index) {
      this.focus = index;
    },
    sendMessage: function (focus) {
      let checkSpace = this.inputMessage.replace(/ /g, "");
      if (checkSpace != "") {
        this.contacts[focus].messages.push({
          text: this.inputMessage,
          date: dayjs().format("DD/MM/YYYY HH:mm"),
          status: "sent",
          openMessageOption: false,
        });
        this.updateScroll();
        this.inputMessage = "";
        if (this.contacts[focus].status != "Sta scrivendo...") {
          setTimeout(() => {
            this.contacts[focus].status = "Online";
          }, 500);
          setTimeout(() => {
            this.contacts[focus].status = "Sta scrivendo...";
          }, 1500);
        }
        setTimeout(() => {
          this.sendReply(focus);
        }, 2000);
      }
    },
    sendReply: function (focus) {
      this.contacts[focus].messages.push({
        text: this.answersArr[Math.floor(Math.random() * this.answersArr.length)],
        date: dayjs().format("DD/MM/YYYY HH:mm"),
        status: "received",
        openMessageOption: false,
      });
      this.updateScroll();
      this.contacts[focus].status = "Online";
      setTimeout(() => {
        this.contacts[focus].status =
          "Ultimo accesso oggi alle " + dayjs().format("HH:mm");
      }, 2000);
    },
    deleteMessage: function (index) {
      this.contacts[this.focus].messages.splice(index, 1);
    },
    updateScroll: function () {
      let chat = document.getElementById("chat");
      setTimeout(() => {
        chat.scrollTop = chat.scrollHeight;
      }, 0);
    },
    deleteAll: function () {
      this.contacts[this.focus].messages.splice(
        0,
        this.contacts[this.focus].messages.length
      );
    },
    deleteChat: function (index) {
      this.focus = -1;
      this.contacts.splice(index, 1);
    },
    newChat: function () {
      this.newChatPopup = false;
      this.focus = this.contacts.length;
      let checkSpace = this.newContactName.replace(/ /g, "");
      if (checkSpace != "") {
        if (
          this.newContactAvatar.endsWith(".jpg") ||
          this.newContactAvatar.endsWith(".jpeg") ||
          this.newContactAvatar.endsWith(".jpg") ||
          this.newContactAvatar.endsWith(".gif") ||
          this.newContactAvatar.endsWith(".png") ||
          this.newContactAvatar.endsWith(".svg") ||
          this.newContactAvatar.endsWith(".bmp")
        ) {
          this.contacts.push({
            name: this.newContactName,
            avatar: this.newContactAvatar,
            visible: true,
            active: false,
            options: false,
            status: "Ultimo accesso oggi alle " + dayjs().format("HH:mm"),
            messages: [],
          });
        } else {
          this.contacts.push({
            name: this.newContactName,
            avatar: "assets/img/default-avatar.png",
            visible: true,
            active: false,
            options: false,
            status: "Ultimo accesso oggi alle " + dayjs().format("HH:mm"),
            messages: [],
          });
        }
      }
      this.newContactName = "";
      this.newContactAvatar = "";
    },
  },
  mounted: function () {
    setTimeout(() => {
      this.appLoading = false;
    }, 2000);
  },
});