/*
 * Passerelle Consulting — contact form submission.
 *
 * The form posts natively to Formspree without this file; everything here is an
 * upgrade, so the page still works with JavaScript disabled. With JS, the
 * submission goes out via fetch and the visitor gets an inline result instead of
 * being sent to Formspree's own thank-you page.
 *
 * The status strings are not stored here. They sit in the markup as hidden
 * [data-i18n] spans, which means assets/i18n.js already translates them and this
 * file just reads whichever one it needs at the moment it needs it.
 */
(function(){
  var form = document.getElementById('contact-form');
  if (!form) return;

  var statusEl = form.querySelector('.form-status');
  var button = form.querySelector('button[type="submit"]');
  var current = null;   // which status key is on screen, so it can re-translate

  function msg(key){
    var el = document.querySelector('[data-i18n="' + key + '"][hidden]');
    return el ? el.textContent : '';
  }

  function show(key, state){
    current = key;
    statusEl.textContent = msg(key);
    statusEl.className = 'form-status is-visible ' + state;
  }

  function clear(){
    current = null;
    statusEl.textContent = '';
    statusEl.className = 'form-status';
  }

  // If the visitor switches language while a message is on screen, swap it too.
  document.querySelectorAll('.lang button').forEach(function(b){
    b.addEventListener('click', function(){
      if (current) statusEl.textContent = msg(current);
    });
  });

  form.addEventListener('submit', function(e){
    // Let the browser handle its own validation first.
    if (!form.checkValidity()) return;

    e.preventDefault();
    button.disabled = true;
    show('form.sending', 'is-sending');

    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    }).then(function(res){
      if (res.ok) {
        form.reset();
        show('form.success', 'is-ok');
      } else {
        show('form.error', 'is-error');
      }
    }).catch(function(){
      show('form.error', 'is-error');
    }).then(function(){
      button.disabled = false;
    });
  });

  // Typing again after an error shouldn't leave a stale message sitting there.
  form.addEventListener('input', function(){
    if (current === 'form.error') clear();
  });
})();
