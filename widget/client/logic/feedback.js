export class FeedbackWidget {
  constructor({ position = "bottom-right" } = {}) {
    this.position = this.getposition(position);
    this.open = false;
    this.businessid = this.getbusinessid();
    this.initialize();
    this.initializeStyles();
  }
  getbusinessid() {
    // Get the script element
    const scriptElement = document.currentScript;

    // Extract the URL of the script
    const scriptUrl = scriptElement.src;

    // Parse the URL to get the id parameter
    const urlParams = new URLSearchParams(scriptUrl.split("?")[1]);
    const id = urlParams.get("id");

    // Now you can use the id parameter as needed
    console.log("ID:", id);
    return id;
  }

  getposition(position) {
    const [vetical, horizontal] = position.split("-");

    return {
      [vetical]: "30px",
      [horizontal]: "30px",
    };
  }

  initialize() {
    const container = document.createElement("div");
    container.style.position = "fixed";
    container.classList.add("mainContainer");

    Object.keys(this.position).forEach(
      (key) => (container.style[key] = this.position[key])
    );

    document.body.appendChild(container);

    // Button container
    const btnContainer = document.createElement("div");
    btnContainer.classList.add("btnContainer");
    btnContainer.addEventListener("click", this.toggle.bind(this));
    const openBtn = document.createElement("button");
    openBtn.innerText = "Feedback";
    this.openBtn = openBtn;

    const closeBtn = document.createElement("button");
    closeBtn.innerText = "Close";
    closeBtn.classList.add("hidden");
    this.closeBtn = closeBtn;

    //
    btnContainer.appendChild(openBtn);
    btnContainer.appendChild(closeBtn);
    container.appendChild(btnContainer);

    // Feedback Container
    this.getfeedbackForm = document.createElement("form");
    this.getfeedbackForm.classList.add("feedbackform", "hidden");

    //  email
    const email = document.createElement("input");
    email.type = "email";
    email.placeholder = "Provide your Email";
    email.required = true;
    // feedback title
    const feedbackTitle = document.createElement("input");
    feedbackTitle.type = "text";
    feedbackTitle.placeholder = "Provide a short descriptive title";
    feedbackTitle.required = true;

    // message
    const feedbackmessage = document.createElement("textarea");
    feedbackmessage.placeholder = "More information about your feedback";
    feedbackmessage.required = true;
    // submit btn
    const submitBtn = document.createElement("button");
    submitBtn.innerText = "Submit";
    submitBtn.addEventListener("click", async (event) => {
      event.preventDefault();
      const formData = {
        email: email.value,
        title: feedbackTitle.value,
        description: feedbackmessage.value,
        businessid: "65c8e8fe54db33b9b0f3bb4f",
      };
      if (!email.value || !feedbackTitle.value || !feedbackmessage.value)
        return alert("Provide all fields");
      try {
        const resp = await fetch("http://localhost:5173/api/feedback/", {
          method: "POST",
          headers: {
            "content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await resp.json();

        if (data.status === 200) {
          email.value = "";
          feedbackTitle.value = "";
          feedbackmessage.value = "";
          alert("Thank you for your feedback");
        } else {
          alert("Error. Try again.");
        }
      } catch (error) {
        alert("Error. Try again.");
        console.log(error);
      }
    });

    //

    this.getfeedbackForm.appendChild(email);
    this.getfeedbackForm.appendChild(feedbackTitle);
    this.getfeedbackForm.appendChild(feedbackmessage);
    this.getfeedbackForm.appendChild(submitBtn);
    container.appendChild(this.getfeedbackForm);
  }

  toggle() {
    this.open = !this.open;
    if (!this.open) {
      this.closeBtn.classList.add("hidden");
      this.openBtn.classList.remove("hidden");
      this.getfeedbackForm.classList.add("hidden");
    } else {
      this.closeBtn.classList.remove("hidden");
      this.openBtn.classList.add("hidden");
      this.getfeedbackForm.classList.remove("hidden");
    }
  }

  initializeStyles() {
    const style = document.createElement("style");
    style.innerHTML = ``;
    style.innerHTML = `
    .mainContainer{
        // outline:1px solid red;
        display:flex;
        height:300px;
        flex-direction:column-reverse;
        width:300px;
        // justify-content:center;
        align-items:center;    
        gap:5px;
    }  
    .mainContainer button{
        width:100px; 
        font-size:15px; 
    } 
    .feedbackform{
        // outline:1px solid yellow;
        border-radius:5px;
        background-color:#24c2ff;
        display:flex;
        flex-direction:column;
        width:90%;
        justify-content:space-evenly;
        align-items:center;
        height:100%;
        padding:10px;
    } 

    
    .feedbackform input{
        width:90%;
        height:30px;
        outline:1px solid black;
        border-radius:5px;
        border:none;
        transition:  .2s ease;
        font-family: Helvetica, Arial ,sans-serif;
    }

    .feedbackform textarea{
        width:90%;
        min-height:70px;
        outline:1px solid black;
        border-radius:5px;
        border:none;
    }
    .feedbackform button{
        padding:9px;
        border-radius:5px;
        border:none;
        background-color:#fff;
        color:black;
        cursor:pointer;  
         
    }  
    
    .btnContainer{
        display:flex;
        // outline:1px solid red;
        width:fit-content;
        justify-content:end;
        align-self:end;
        
   }
   .btnContainer button{
    padding:9px;
    border-radius:5px;
    border:none;
    background-color:#24c2ff;
    color:white;
    cursor:pointer; 
 
   }
   .hidden{
    display:none;
   }

    `;

    document.head.appendChild(style);
  }
}
