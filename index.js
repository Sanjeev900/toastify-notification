import classes from "./Toast.module.css";

export class toast {
  constructor() {}

  static notify(msg = null, { id = null, duration = 7, type = "info", title }) {
    const notification = document.createElement("div");
    const notificationCloseHandler = () => {
      clearTimeout(autoCloseNotification);
      document.body.removeChild(notification);
    };

    if (id === null) {
      id = Math.random();
    }

    let imgSource;
    let barClass;
    let heading;
    let message;
    switch (type) {
      case "success":
        imgSource = "/img/tick.svg";
        barClass = classes.success;
        heading = "Success";
        message = "Operation successful";
        break;
      case "warning":
        imgSource = "/img/warning.svg";
        barClass = classes.warning;
        heading = "Warning";
        message = "Duh duh duh!";
        break;
      case "error":
        imgSource = "/img/error.svg";
        barClass = classes.error;
        heading = "Error";
        message = "Ooops! Something went wrong.";
        break;
      default:
        imgSource = "/img/info.svg";
        barClass = classes.info;
        heading = "Info";
        message = "This needs attention.";
        break;
    }

    if (title) {
      message = title;
    }

    notification.className = classes.notification_container;
    notification.innerHTML = `
        <div class=${barClass}></div>
        <div class=${classes.notification}>
          <div class=${classes.notification_image}>
            <img src=${imgSource} alt='' />
          </div>
          <div class=${classes.notification_content}> 
            <p class=${classes.notification_title}>${heading}</p> 
            <p class=${classes.notification_message}>${message}</p>
          </div> 
          <button class=${classes.button_img} id=${id}>
            <img src='/img/cross_thin.svg' />
          </button>
        </div>
        `;

    document.body.appendChild(notification);

    const autoCloseNotification = setTimeout(
      notificationCloseHandler,
      duration * 1000
    );

    const closeButton = document.getElementById(id);
    if (closeButton) {
      closeButton.addEventListener("click", notificationCloseHandler);
    }
  }
}
