(function($) {

  $.fn.sixeightform = function(options) {
    if(typeof(options) == 'string') {
      var settings = $.extend({
        handle: null,
        action: CCM_REL + '/index.php/tools/packages/sixeightforms/process',
        callback: function() {}
      },{
        handle: options
      });
    } else {
      var settings = $.extend({
        handle: null,
        action: CCM_REL + '/index.php/tools/packages/sixeightforms/process',
        callback: function() {}
      },options);
    }

    return this.each(function() {
      var $f = $(this);

      $f.submit(function() {
        if($f.hasClass('processing')) {
          return false;
        } else {
          processSixeightForm($f);
          return false;
        }
      });

      function processSixeightForm(sixeightform) {
        sixeightform.addClass('processing');
        var formData = sixeightform.serialize();
        if(settings.handle == null) {
          settings.handle = sixeightform.attr('id');
        }
        $.ajax({
          type: 'POST',
          url: settings.action + '?ajax=1&handle=' + settings.handle,
          dataType: 'json',
          data: formData,
          error: function(XMLHttpRequest,status,errorThrown) {
            alert('There was an error submitting this form.  Please contact the administrator of this site.');
          },
          success: function(response) {
            if(response.hasErrors == '1') {
              alert('There was an error submitting this form.');
              sixeightform.removeClass('processing');
              settings.callback.call();
            } else {
              if((response.hook != null) || (typeof(settings.hook) != 'undefined')) {
                if(typeof(settings.hook) != 'undefined') {
                  var hook = settings.hook;
                } else {
                  var hook = CCM_TOOLS_PATH + '/sixeightforms/' + response.hook;
                }
                $.ajax({
                  type: 'GET',
                  url: hook + '?asID=' + response.asID,
                  success: function() {
                    switch(response.action) {
                      case 'thankyou':
                        sixeightform.fadeOut('fast',function() {
                          sixeightform.html(response.response);
                          sixeightform.fadeIn('fast');
                        });
                        break;
                      case 'redirect':
                        window.location = response.response;
                        break;
                      case 'url':
                        window.location = response.response;
                        break;
                    }
                    sixeightform.removeClass('processing');
                    settings.callback.call();
                  }
                });
              } else {
                switch(response.action) {
                  case 'thankyou':
                    sixeightform.fadeOut('fast',function() {
                      sixeightform.html(response.response);
                      sixeightform.fadeIn('fast');
                    });
                    break;
                  case 'redirect':
                    window.location = response.response;
                    break;
                  case 'url':
                    window.location = response.response;
                    break;
                }
                sixeightform.removeClass('processing');
                settings.callback.call();
              }
            }
          }
        });
      }
    });

  }

}(jQuery));
