import consumer from "./consumer";

const url = window.location.href;
let id = url.split("/")[4];

consumer.subscriptions.create(
  { channel: "NotificationsChannel", user_id: id },
  {
    connected() {
      console.log("Connect to NotificationsChannel " + id);
    },

    disconnected() {},

    received(data) {
      const element = document.getElementById("notifications");
      let html;
      if (data.number_of_follower > 0) {
        html = `<dialog id="message" open><p> ${data.follower_name} va ${data.number_of_follower} nguoi khac da follow ban!!! </p></dialog>`;
      } else {
        html = `<dialog id="message" open><p> ${data.follower_name} da follow ban!!! </p></dialog>`;
      }
      element.insertAdjacentHTML("beforeend", html);
    },
  }
);
