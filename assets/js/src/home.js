(() => {
  // Nav starts at bottom then is fixed to top
  // Logo and hamburger menus fade in and out
  const ITEMS = [...$(".nav-item")]
  const SECTIONS = [...$("main > section")].reverse()
  const THRESHOLD = 330
  var oldIdx = -1

  var headLine = $('#HeadLine');
  headLine.addClass('ani-btu');

  $(window).scroll(function() { 
    var scrollPosition = $(window).scrollTop()// window.scrollY || window.pageYOffset
        windowHeight = $(window).innerHeight();// window.innerHeight
        //navHeight = nav.clientHeight

    //ScrollSetFixNavHandler(scrollPosition > windowHeight - navHeight)
    ScrollSetFixNavHandler(scrollPosition > windowHeight - 1) //因目前有個滑入動畫，所以改為全nav離開畫面後才fix
    ScrollChangeNavHeaderHandler(scrollPosition)
    ScrollFadeCoverTitleHandler(scrollPosition)
  });
  
  //Scroll change nav header handler
  function ScrollChangeNavHeaderHandler(scrollPos) {
    const idx = SECTIONS.length - 1 - SECTIONS.findIndex(
      (sec) => scrollPos > sec.offsetTop - THRESHOLD 
    )
    
    if (idx != oldIdx) {
      requestAnimationFrame(() => { changeNavHeader(idx) })
    }
  }
  function changeNavHeader(idx) {
    $.each(ITEMS, (index, el) => {
      $(el).removeClass("nav-item-active");
    })
    if (idx < SECTIONS.length) {
     $(ITEMS[idx]).addClass("nav-item-active")
    }
    oldIdx = idx
  }

  //Scroll fixNav handler
  function ScrollSetFixNavHandler(isPosLeaveCover) {
    if (isPosLeaveCover) {
      if (!navFixed) { requestAnimationFrame(() => fixNav(true)) }
    } else {
      if (navFixed) { requestAnimationFrame(() => fixNav(false)) }
    }
  }

  //Scroll fade cover-title handler
  function ScrollFadeCoverTitleHandler(scrollPos) {
    if(!headLine) {
      return;
    }

    if(headLine.hasClass('ani-btu')) {
      headLine.removeClass('ani-btu');
    }

    var distanceToTop = headLine.offset().top;
    var elementHeight = headLine.height();
    var opacity = 1;
    var posTop = 0;
    
    if (scrollPos > distanceToTop) {
      opacity = 1 - (scrollPos - distanceToTop) / elementHeight;
      posTop = ((scrollPos - distanceToTop) / elementHeight) * 120;
    }
    
    if (opacity >= 0) {
      headLine.css({ 'opacity' : opacity });
      headLine.css({ 'top': posTop + 'px' });
    }
  }

  /*
  var header = $('header')
  var oldViewportHeight = 0;
  const heightChangeThreshold = 120; // approximate address bar height fits for Chrome (100) and Brave (104)
  // Viewport size in mobile is impaired by address bar that automatically collapses on scroll.
  // This updates it to the "real dynamic viewport size"
  function updateViewportToInner() {
    // Adapted from: https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
    // let vh = window.innerHeight * 0.01;
    // document.documentElement.style.setProperty('--vh', `${vh}px`);

    // The following is a nasty hack and definitely not perfect: 
    // We only want to change the height if the user directly resizes the window, 
    // hence we aim to ignore "auto-collapse" address bar resize events by only resizing if guessed threshold was exceeded.
    if (Math.abs(oldViewportHeight - window.innerHeight) > heightChangeThreshold) {
      // header.style.maxHeight = window.innerHeight + 'px'
      header.style.height = window.innerHeight + 'px'
      oldViewportHeight = window.innerHeight
    }
  }
  updateViewportToInner()
  window.addEventListener('resize', updateViewportToInner)
  */
})()