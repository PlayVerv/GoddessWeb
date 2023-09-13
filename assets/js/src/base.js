//For lazyimg and some js libs
document.documentElement.className = "js"

/**
 * 
 * @param {Element} e Element for DOM modification 
 * @param {boolean} visible Self-explanatory. true = visible, false = hidden
 * @param {boolean} useAttr Using visibility attribute will prevent smooth navbar transition 
 */
function setVisibility(e, visible, useAttr = true) {
  if (visible) {
    $(e).css({ 'visibility' : 'visible' });
    if (useAttr) {
      $(e).removeProp("hidden");
    }
  } else {
    $(e).css({ 'visibility' : 'hidden' });
    if (useAttr) {
      $(e).prop("hidden", true);
    }
  }
  $(e).addClass(visible ? 'show' : 'hide')
  $(e).removeClass(visible ? 'hide' : 'show')
}