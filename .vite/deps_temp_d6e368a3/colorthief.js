import "./chunk-3EJPJMEH.js";

// node_modules/colorthief/dist/color-thief.mjs
var t = function(t2) {
  this.canvas = document.createElement("canvas"), this.context = this.canvas.getContext("2d"), this.width = this.canvas.width = t2.width, this.height = this.canvas.height = t2.height, this.context.drawImage(t2, 0, 0, this.width, this.height);
};
t.prototype.getPixelCount = function() {
  return this.width * this.height;
}, t.prototype.getImageData = function() {
  return this.context.getImageData(0, 0, this.width, this.height);
};
var r = function() {
};
if (r.prototype.getColor = function(t2, r2) {
  return this.getPalette(t2, 5, r2)[0];
}, r.prototype.getPalette = function(r2, n2, e) {
  (void 0 === n2 || n2 < 2 || n2 > 256) && (n2 = 10), (void 0 === e || e < 1) && (e = 10);
  for (var i, u, s, a, h = new t(r2), c = h.getImageData().data, f = h.getPixelCount(), v = [], p = 0; p < f; p += e)
    u = c[0 + (i = 4 * p)], s = c[i + 1], a = c[i + 2], c[i + 3] >= 125 && (u > 250 && s > 250 && a > 250 || v.push([u, s, a]));
  var g = o.quantize(v, n2);
  return g ? g.palette() : null;
}, r.prototype.getColorFromUrl = function(t2, r2, n2) {
  var o2 = document.createElement("img"), e = this;
  o2.addEventListener("load", function() {
    var i = e.getPalette(o2, 5, n2);
    r2(i[0], t2);
  }), o2.src = t2;
}, r.prototype.getImageData = function(t2, r2) {
  var n2 = new XMLHttpRequest();
  n2.open("GET", t2, true), n2.responseType = "arraybuffer", n2.onload = function() {
    if (200 == this.status) {
      var t3 = new Uint8Array(this.response);
      o2 = t3.length;
      for (var n3 = new Array(o2), o2 = 0; o2 < t3.length; o2++)
        n3[o2] = String.fromCharCode(t3[o2]);
      var e = n3.join(""), i = window.btoa(e);
      r2("data:image/png;base64," + i);
    }
  }, n2.send();
}, r.prototype.getColorAsync = function(t2, r2, n2) {
  var o2 = this;
  this.getImageData(t2, function(t3) {
    var e = document.createElement("img");
    e.addEventListener("load", function() {
      var t4 = o2.getPalette(e, 5, n2);
      r2(t4[0], this);
    }), e.src = t3;
  });
}, !n)
  var n = { map: function(t2, r2) {
    var n2 = {};
    return r2 ? t2.map(function(t3, o2) {
      return n2.index = o2, r2.call(n2, t3);
    }) : t2.slice();
  }, naturalOrder: function(t2, r2) {
    return t2 < r2 ? -1 : t2 > r2 ? 1 : 0;
  }, sum: function(t2, r2) {
    var n2 = {};
    return t2.reduce(r2 ? function(t3, o2, e) {
      return n2.index = e, t3 + r2.call(n2, o2);
    } : function(t3, r3) {
      return t3 + r3;
    }, 0);
  }, max: function(t2, r2) {
    return Math.max.apply(null, r2 ? n.map(t2, r2) : t2);
  } };
var o = function() {
  var t2 = 5, r2 = 8 - t2, o2 = 1e3;
  function e(r3, n2, o3) {
    return (r3 << 2 * t2) + (n2 << t2) + o3;
  }
  function i(t3) {
    var r3 = [], n2 = false;
    function o3() {
      r3.sort(t3), n2 = true;
    }
    return { push: function(t4) {
      r3.push(t4), n2 = false;
    }, peek: function(t4) {
      return n2 || o3(), void 0 === t4 && (t4 = r3.length - 1), r3[t4];
    }, pop: function() {
      return n2 || o3(), r3.pop();
    }, size: function() {
      return r3.length;
    }, map: function(t4) {
      return r3.map(t4);
    }, debug: function() {
      return n2 || o3(), r3;
    } };
  }
  function u(t3, r3, n2, o3, e2, i2, u2) {
    this.r1 = t3, this.r2 = r3, this.g1 = n2, this.g2 = o3, this.b1 = e2, this.b2 = i2, this.histo = u2;
  }
  function s() {
    this.vboxes = new i(function(t3, r3) {
      return n.naturalOrder(t3.vbox.count() * t3.vbox.volume(), r3.vbox.count() * r3.vbox.volume());
    });
  }
  function a(t3, r3) {
    if (r3.count()) {
      var o3 = r3.r2 - r3.r1 + 1, i2 = r3.g2 - r3.g1 + 1, u2 = n.max([o3, i2, r3.b2 - r3.b1 + 1]);
      if (1 == r3.count())
        return [r3.copy()];
      var s2, a2, h, c, f = 0, v = [], p = [];
      if (u2 == o3)
        for (s2 = r3.r1; s2 <= r3.r2; s2++) {
          for (c = 0, a2 = r3.g1; a2 <= r3.g2; a2++)
            for (h = r3.b1; h <= r3.b2; h++)
              c += t3[e(s2, a2, h)] || 0;
          v[s2] = f += c;
        }
      else if (u2 == i2)
        for (s2 = r3.g1; s2 <= r3.g2; s2++) {
          for (c = 0, a2 = r3.r1; a2 <= r3.r2; a2++)
            for (h = r3.b1; h <= r3.b2; h++)
              c += t3[e(a2, s2, h)] || 0;
          v[s2] = f += c;
        }
      else
        for (s2 = r3.b1; s2 <= r3.b2; s2++) {
          for (c = 0, a2 = r3.r1; a2 <= r3.r2; a2++)
            for (h = r3.g1; h <= r3.g2; h++)
              c += t3[e(a2, h, s2)] || 0;
          v[s2] = f += c;
        }
      return v.forEach(function(t4, r4) {
        p[r4] = f - t4;
      }), function(t4) {
        var n2, o4, e2, i3, u3, a3 = t4 + "1", h2 = t4 + "2", c2 = 0;
        for (s2 = r3[a3]; s2 <= r3[h2]; s2++)
          if (v[s2] > f / 2) {
            for (e2 = r3.copy(), i3 = r3.copy(), u3 = (n2 = s2 - r3[a3]) <= (o4 = r3[h2] - s2) ? Math.min(r3[h2] - 1, ~~(s2 + o4 / 2)) : Math.max(r3[a3], ~~(s2 - 1 - n2 / 2)); !v[u3]; )
              u3++;
            for (c2 = p[u3]; !c2 && v[u3 - 1]; )
              c2 = p[--u3];
            return e2[h2] = u3, i3[a3] = e2[h2] + 1, [e2, i3];
          }
      }(u2 == o3 ? "r" : u2 == i2 ? "g" : "b");
    }
  }
  return u.prototype = { volume: function(t3) {
    return this._volume && !t3 || (this._volume = (this.r2 - this.r1 + 1) * (this.g2 - this.g1 + 1) * (this.b2 - this.b1 + 1)), this._volume;
  }, count: function(t3) {
    var r3 = this.histo;
    if (!this._count_set || t3) {
      var n2, o3, i2, u2 = 0;
      for (n2 = this.r1; n2 <= this.r2; n2++)
        for (o3 = this.g1; o3 <= this.g2; o3++)
          for (i2 = this.b1; i2 <= this.b2; i2++)
            u2 += r3[e(n2, o3, i2)] || 0;
      this._count = u2, this._count_set = true;
    }
    return this._count;
  }, copy: function() {
    return new u(this.r1, this.r2, this.g1, this.g2, this.b1, this.b2, this.histo);
  }, avg: function(r3) {
    var n2 = this.histo;
    if (!this._avg || r3) {
      var o3, i2, u2, s2, a2 = 0, h = 1 << 8 - t2, c = 0, f = 0, v = 0;
      for (i2 = this.r1; i2 <= this.r2; i2++)
        for (u2 = this.g1; u2 <= this.g2; u2++)
          for (s2 = this.b1; s2 <= this.b2; s2++)
            a2 += o3 = n2[e(i2, u2, s2)] || 0, c += o3 * (i2 + 0.5) * h, f += o3 * (u2 + 0.5) * h, v += o3 * (s2 + 0.5) * h;
      this._avg = a2 ? [~~(c / a2), ~~(f / a2), ~~(v / a2)] : [~~(h * (this.r1 + this.r2 + 1) / 2), ~~(h * (this.g1 + this.g2 + 1) / 2), ~~(h * (this.b1 + this.b2 + 1) / 2)];
    }
    return this._avg;
  }, contains: function(t3) {
    var n2 = t3[0] >> r2, o3 = t3[1] >> r2, e2 = t3[2] >> r2;
    return n2 >= this.r1 && n2 <= this.r2 && o3 >= this.g1 && o3 <= this.g2 && e2 >= this.b1 && e2 <= this.b2;
  } }, s.prototype = { push: function(t3) {
    this.vboxes.push({ vbox: t3, color: t3.avg() });
  }, palette: function() {
    return this.vboxes.map(function(t3) {
      return t3.color;
    });
  }, size: function() {
    return this.vboxes.size();
  }, map: function(t3) {
    for (var r3 = this.vboxes, n2 = 0; n2 < r3.size(); n2++)
      if (r3.peek(n2).vbox.contains(t3))
        return r3.peek(n2).color;
    return this.nearest(t3);
  }, nearest: function(t3) {
    for (var r3, n2, o3, e2 = this.vboxes, i2 = 0; i2 < e2.size(); i2++)
      ((n2 = Math.sqrt(Math.pow(t3[0] - e2.peek(i2).color[0], 2) + Math.pow(t3[1] - e2.peek(i2).color[1], 2) + Math.pow(t3[2] - e2.peek(i2).color[2], 2))) < r3 || void 0 === r3) && (r3 = n2, o3 = e2.peek(i2).color);
    return o3;
  }, forcebw: function() {
    var t3 = this.vboxes;
    t3.sort(function(t4, r4) {
      return n.naturalOrder(n.sum(t4.color), n.sum(r4.color));
    });
    var r3 = t3[0].color;
    r3[0] < 5 && r3[1] < 5 && r3[2] < 5 && (t3[0].color = [0, 0, 0]);
    var o3 = t3.length - 1, e2 = t3[o3].color;
    e2[0] > 251 && e2[1] > 251 && e2[2] > 251 && (t3[o3].color = [255, 255, 255]);
  } }, { quantize: function(h, c) {
    if (!h.length || c < 2 || c > 256)
      return false;
    var f = function(n2) {
      var o3, i2 = new Array(1 << 3 * t2);
      return n2.forEach(function(t3) {
        o3 = e(t3[0] >> r2, t3[1] >> r2, t3[2] >> r2), i2[o3] = (i2[o3] || 0) + 1;
      }), i2;
    }(h);
    f.forEach(function() {
    });
    var v = function(t3, n2) {
      var o3, e2, i2, s2 = 1e6, a2 = 0, h2 = 1e6, c2 = 0, f2 = 1e6, v2 = 0;
      return t3.forEach(function(t4) {
        (o3 = t4[0] >> r2) < s2 ? s2 = o3 : o3 > a2 && (a2 = o3), (e2 = t4[1] >> r2) < h2 ? h2 = e2 : e2 > c2 && (c2 = e2), (i2 = t4[2] >> r2) < f2 ? f2 = i2 : i2 > v2 && (v2 = i2);
      }), new u(s2, a2, h2, c2, f2, v2, n2);
    }(h, f), p = new i(function(t3, r3) {
      return n.naturalOrder(t3.count(), r3.count());
    });
    function g(t3, r3) {
      for (var n2, e2 = 1, i2 = 0; i2 < o2; )
        if ((n2 = t3.pop()).count()) {
          var u2 = a(f, n2), s2 = u2[0], h2 = u2[1];
          if (!s2)
            return;
          if (t3.push(s2), h2 && (t3.push(h2), e2++), e2 >= r3)
            return;
          if (i2++ > o2)
            return;
        } else
          t3.push(n2), i2++;
    }
    p.push(v), g(p, 0.75 * c);
    for (var l = new i(function(t3, r3) {
      return n.naturalOrder(t3.count() * t3.volume(), r3.count() * r3.volume());
    }); p.size(); )
      l.push(p.pop());
    g(l, c - l.size());
    for (var b = new s(); l.size(); )
      b.push(l.pop());
    return b;
  } };
}();
var color_thief_default = r;
export {
  color_thief_default as default
};
//# sourceMappingURL=colorthief.js.map
