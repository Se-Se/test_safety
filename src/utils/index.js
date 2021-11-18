export function jsonShowFn(json) {
  if (!json.match("^{(.+:.+,*){1,}}$")) {
    return json; //判断是否是json数据，不是直接返回
  }

  if (typeof json != "string") {
    json = JSON.stringify(json, undefined, 2);
  }
  json = json.replace(/&/g, "&").replace(/</g, "<").replace(/>/g, ">");
  // eslint-disable-next-line
  return json.replace(
    // eslint-disable-next-line
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    function (match) {
      var cls = "number";
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = "key";
        } else {
          cls = "string";
        }
      } else if (/true|false/.test(match)) {
        cls = "boolean";
      } else if (/null/.test(match)) {
        cls = "null";
      }
      return '<span class="' + cls + '">' + match + "</span>";
    }
  );
}

// 添加 windows 绑定事件
export function addWindowEvent(theEvent, fn) {
  window.addEventListener(theEvent, fn, false);
}

// 删除windows事件
export function removeWindowEvent(theEvent, fn) {
  window.removeEventListener(theEvent, fn);
}

// 获取路由的params
export function getAllUrlParams(url) {
  // get query string from url (optional) or window
  var queryString = url ? url.split("?")[1] : window.location.search.slice(1);

  // we'll store the parameters here
  var obj = {};

  // if query string exists
  if (queryString) {
    // stuff after # is not part of query string, so get rid of it
    queryString = queryString.split("#")[0];

    // split our query string into its component parts
    var arr = queryString.split("&");

    for (var i = 0; i < arr.length; i++) {
      // separate the keys and the values
      var a = arr[i].split("=");

      // set parameter name and value (use 'true' if empty)
      var paramName = a[0];
      var paramValue = typeof a[1] === "undefined" ? true : a[1];

      // (optional) keep case consistent
      // paramName = paramName;
      // if (typeof paramValue === 'string') paramValue = paramValue

      // if the paramName ends with square brackets, e.g. colors[] or colors[2]
      if (paramName.match(/\[(\d+)?\]$/)) {
        // create key if it doesn't exist
        var key = paramName.replace(/\[(\d+)?\]/, "");
        if (!obj[key]) obj[key] = [];

        // if it's an indexed array e.g. colors[2]
        if (paramName.match(/\[\d+\]$/)) {
          // get the index value and add the entry at the appropriate position
          var index = /\[(\d+)\]/.exec(paramName)[1];
          obj[key][index] = paramValue;
        } else {
          // otherwise add the value to the end of the array
          obj[key].push(paramValue);
        }
      } else {
        // we're dealing with a string
        if (!obj[paramName]) {
          // if it doesn't exist, create property
          obj[paramName] = paramValue;
        } else if (obj[paramName] && typeof obj[paramName] === "string") {
          // if property does exist and it's a string, convert it to an array
          obj[paramName] = [obj[paramName]];
          obj[paramName].push(paramValue);
        } else {
          // otherwise add the property
          obj[paramName].push(paramValue);
        }
      }
    }
  }
  return obj;
}

// 获取路由参数
export function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] === variable) {
      return pair[1];
    }
  }
  return false;
}

/* 从localstorage里面获取特定的值 */
export function getStorage(key) {
  if (!key) return;
  let res = localStorage.getItem(key);
  try {
    return JSON.parse(res);
  } catch (err) {
    return res;
  }
}

// 数组排序递归 fn
export function sortArrFn(data, sortItem) {
  if (data.length) {
    data.map((item, index) => {
      let obj = item;
      if (
        index <= data.length - 2 &&
        item[sortItem] < data[index + 1][sortItem]
      ) {
        data[index] = JSON.parse(JSON.stringify(data[index + 1]));
        data[index + 1] = JSON.parse(JSON.stringify(obj));
        sortArrFn(data, sortItem);
      }
      return item;
    });
  }
}

// 计算滚动容器高度
export function coculateHeight(target, arr, fix) {
  let len = 0;
  if (arr.length > 0) {
    arr.map((item) => {
      let h = document.getElementsByClassName(item)[0].offsetHeight;
      len += h;
      return item;
    });
    len += fix;
  }
  let fliteH = len + "px";
  let t = document.getElementsByClassName(target)[0];
  t.style.height = `calc(100vh - ${fliteH})`;
}

// 计算dom容器高度
export function coculateDomsHeight( arr, fix) {
  let len = 0;
  if (arr.length > 0) {
    arr.map((item) => {
      let h = document.getElementsByClassName(item)[0].offsetHeight;
      len += h;
      return item;
    });
    len += fix||0;
  }
  let high = len + "px";
  return high
}

