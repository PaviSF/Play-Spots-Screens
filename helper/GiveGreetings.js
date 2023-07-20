const getGreeting = () => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
  
    let greeting = "";
  
    if (currentHour >= 5 && currentHour < 12) {
      greeting = "Good Morning";
    } else if (currentHour >= 12 && currentHour < 17) {
      greeting = "Good Afternoon";
    } else {
      greeting = "Good Evening";
    }
  
    return greeting;
  }
   export {getGreeting} 