var menuActive = false
var navFixed = false
var nav = $('nav')
    navToggleAndLogo = $('nav > .logo, nav > .nav-toggle')

function fixNav(setFixed) {
  if (setFixed) {
    nav.addClass('nav-fixed')
    nav.addClass('nav-slide-in')
    navToggleAndLogo.each((index, el) => {
      setVisibility($(el), true, false)
    });
  } else {
    nav.removeClass('nav-fixed')
    nav.removeClass('nav-slide-in')
    navToggleAndLogo.each((index, el) => {
      setVisibility($(el), false, false)
    })
  }
  navFixed = setFixed
}

function toggleMenu() {
  if (menuActive) {
    $('.nav-icon').removeClass('icon-active')
  } else {
    $('.nav-icon').addClass('icon-active')
  }
  menuActive = !menuActive
}

// Full screen nav open on click
$('.nav-icon').click(() => {
  toggleMenu()
  $('.nav-full, main').each((index, el) => {
    if ($(el).hasClass('active')) {
      $(el).removeClass('active')
    } else {
      $(el).addClass('active')
    }
  })
})

// Full screen nav close on click
$('.nav-full a').each((index, el) => {
  $(el).on('click', () => {
    toggleMenu()
    $('.nav-full, main').each((index, el) => {
      if ($(el).hasClass('active')) {
        $(el).removeClass('active')
      } else {
        $(el).addClass('active')
      }
    })
  })
})

// Fix logoBig drawing over nav when click on logoSmall while nav open
$('.logo').click(() => {
  if ($('.nav-full').hasClass('active')) {
    toggleMenu()
    $('.nav-full, main').each((index, el) => {
      if ($(el).hasClass('active')) {
        $(el).removeClass('active')
      } else {
        $(el).addClass('active')
      }
    })
  }
})

// Disable scroll when full screen nav is open
$('body').click(() => {
  if ($('.nav-full').hasClass('active')) {
    $('html').css({ 'overflowY' : 'hidden' })
  } else {
    $('html').css({ 'overflowY' : 'scroll' })
  }
})
