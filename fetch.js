function fetchAPI() {
  var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var payload = arguments.length > 2 && arguments[2] !== undefined ?arguments[2]: {};
  var xhr = new XMLHttpRequest();
  var onFufillment = [];
  var onError = [];
  var onCompletion = [];
  var method = "POST" || options.method;
  xhr.onreadystatechange = function () {
      var _data = this;
      if (this.readyState == 4 && this.status == 200) {
      // Action to be performed when the document is read;
      onFufillment.forEach(function (callback) {
          callback(_data);
      });
      onCompletion.forEach(function (callback) {
          callback(_data);
      });
      } else if (this.readyState == 4 && this.status !== 200) {
      onError.forEach(function (callback) {
          callback(_data);
      });
      onCompletion.forEach(function (callback) {
          callback(_data);
      });
      }
  };
  xhr.open(method, url, true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
  xhr.send(JSON.stringify(payload));

  return {
      then: function then(fufillmentFunction) {
      onFufillment.push(fufillmentFunction);
      return this;
      },
      catch: function _catch(errorFunction) {
      onError.push(errorFunction);
      return this;
      },
      finally: function _finally(completionFunction) {
      onCompletion.push(completionFunction);
      return this;
      },
  };
}
  