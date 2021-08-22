import consumer from "./consumer";

let arr = [];
let first_login;

document.addEventListener("turbolinks:load", () => {
  let notifications_element = document.getElementById("notifications");
  let current_user_id = notifications_element.getAttribute("current-user-id");

  first_login = notifications_element.getAttribute("first-login");

  consumer.subscriptions.create(
    { channel: "NotificationsChannel", user_id: current_user_id },
    {
      connected() {
        console.log("Connect to NotificationsChannel " + current_user_id);
        // Called when the subscription is ready for use on the server
      },

      disconnected() {
        // Called when the subscription has been terminated by the server
      },

      received(data) {
        if (!checkUserExists(data)) {
          arr.push(data);
        }
      },
    }
  );
});

function checkUserExists(data) {
  return arr.find((item) => {
    return item.user_name_follow == data.user_name_follow;
  });
}

function createNotification(data) {
  return `
    <dialog id="message" open><p> ${data.user_name_follow} da follow ban!!! </p></dialog>
  `;
}

function createNotifications(data) {
  return `
    <dialog id="message" open><p> ${data[0].user_name_follow} va ${
    data.length - 1
  } nguoi ban khac da follow ban!!! </p></dialog>
  `;
}

setInterval(function () {
  const element = document.getElementById("notifications");

  if (arr.length == 1) {
    const html = createNotification(arr[0]);
    element.insertAdjacentHTML("beforeend", html);
    arr = [];
    return;
  }

  if (arr.length > 1) {
    const html = createNotifications(arr);
    element.insertAdjacentHTML("beforeend", html);
    arr = [];
    return;
  }
}, 15000);

setTimeout(() => {
  if (first_login == "false") {
    console.log(first_login);
    const element = document.getElementById("notification-first-login");
    const html = `<div class="alert alert-success">Cảm ơn bạn đã login lần đầu tiên</div>`;
    element.insertAdjacentHTML("beforeend", html);
  }
}, 1000);
