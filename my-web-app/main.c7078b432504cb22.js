"use strict";
(self.webpackChunkclone_receiptfy =
  self.webpackChunkclone_receiptfy || []).push([
  [179],
  {
    693: () => {
      function te(e) {
        return "function" == typeof e;
      }
      function Lr(e) {
        const n = e((r) => {
          Error.call(r), (r.stack = new Error().stack);
        });
        return (
          (n.prototype = Object.create(Error.prototype)),
          (n.prototype.constructor = n),
          n
        );
      }
      const Ko = Lr(
        (e) =>
          function (n) {
            e(this),
              (this.message = n
                ? `${n.length} errors occurred during unsubscription:\n${n
                    .map((r, o) => `${o + 1}) ${r.toString()}`)
                    .join("\n  ")}`
                : ""),
              (this.name = "UnsubscriptionError"),
              (this.errors = n);
          }
      );
      function kr(e, t) {
        if (e) {
          const n = e.indexOf(t);
          0 <= n && e.splice(n, 1);
        }
      }
      class rt {
        constructor(t) {
          (this.initialTeardown = t),
            (this.closed = !1),
            (this._parentage = null),
            (this._finalizers = null);
        }
        unsubscribe() {
          let t;
          if (!this.closed) {
            this.closed = !0;
            const { _parentage: n } = this;
            if (n)
              if (((this._parentage = null), Array.isArray(n)))
                for (const i of n) i.remove(this);
              else n.remove(this);
            const { initialTeardown: r } = this;
            if (te(r))
              try {
                r();
              } catch (i) {
                t = i instanceof Ko ? i.errors : [i];
              }
            const { _finalizers: o } = this;
            if (o) {
              this._finalizers = null;
              for (const i of o)
                try {
                  Uc(i);
                } catch (s) {
                  (t = t ?? []),
                    s instanceof Ko ? (t = [...t, ...s.errors]) : t.push(s);
                }
            }
            if (t) throw new Ko(t);
          }
        }
        add(t) {
          var n;
          if (t && t !== this)
            if (this.closed) Uc(t);
            else {
              if (t instanceof rt) {
                if (t.closed || t._hasParent(this)) return;
                t._addParent(this);
              }
              (this._finalizers =
                null !== (n = this._finalizers) && void 0 !== n ? n : []).push(
                t
              );
            }
        }
        _hasParent(t) {
          const { _parentage: n } = this;
          return n === t || (Array.isArray(n) && n.includes(t));
        }
        _addParent(t) {
          const { _parentage: n } = this;
          this._parentage = Array.isArray(n) ? (n.push(t), n) : n ? [n, t] : t;
        }
        _removeParent(t) {
          const { _parentage: n } = this;
          n === t ? (this._parentage = null) : Array.isArray(n) && kr(n, t);
        }
        remove(t) {
          const { _finalizers: n } = this;
          n && kr(n, t), t instanceof rt && t._removeParent(this);
        }
      }
      rt.EMPTY = (() => {
        const e = new rt();
        return (e.closed = !0), e;
      })();
      const $c = rt.EMPTY;
      function Vc(e) {
        return (
          e instanceof rt ||
          (e && "closed" in e && te(e.remove) && te(e.add) && te(e.unsubscribe))
        );
      }
      function Uc(e) {
        te(e) ? e() : e.unsubscribe();
      }
      const yn = {
          onUnhandledError: null,
          onStoppedNotification: null,
          Promise: void 0,
          useDeprecatedSynchronousErrorHandling: !1,
          useDeprecatedNextContext: !1,
        },
        Xo = {
          setTimeout(e, t, ...n) {
            const { delegate: r } = Xo;
            return r?.setTimeout
              ? r.setTimeout(e, t, ...n)
              : setTimeout(e, t, ...n);
          },
          clearTimeout(e) {
            const { delegate: t } = Xo;
            return (t?.clearTimeout || clearTimeout)(e);
          },
          delegate: void 0,
        };
      function Bc(e) {
        Xo.setTimeout(() => {
          const { onUnhandledError: t } = yn;
          if (!t) throw e;
          t(e);
        });
      }
      function Hc() {}
      const lD = Ys("C", void 0, void 0);
      function Ys(e, t, n) {
        return { kind: e, value: t, error: n };
      }
      let vn = null;
      function Jo(e) {
        if (yn.useDeprecatedSynchronousErrorHandling) {
          const t = !vn;
          if ((t && (vn = { errorThrown: !1, error: null }), e(), t)) {
            const { errorThrown: n, error: r } = vn;
            if (((vn = null), n)) throw r;
          }
        } else e();
      }
      class Ks extends rt {
        constructor(t) {
          super(),
            (this.isStopped = !1),
            t
              ? ((this.destination = t), Vc(t) && t.add(this))
              : (this.destination = mD);
        }
        static create(t, n, r) {
          return new jr(t, n, r);
        }
        next(t) {
          this.isStopped
            ? Js(
                (function dD(e) {
                  return Ys("N", e, void 0);
                })(t),
                this
              )
            : this._next(t);
        }
        error(t) {
          this.isStopped
            ? Js(
                (function cD(e) {
                  return Ys("E", void 0, e);
                })(t),
                this
              )
            : ((this.isStopped = !0), this._error(t));
        }
        complete() {
          this.isStopped
            ? Js(lD, this)
            : ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed ||
            ((this.isStopped = !0),
            super.unsubscribe(),
            (this.destination = null));
        }
        _next(t) {
          this.destination.next(t);
        }
        _error(t) {
          try {
            this.destination.error(t);
          } finally {
            this.unsubscribe();
          }
        }
        _complete() {
          try {
            this.destination.complete();
          } finally {
            this.unsubscribe();
          }
        }
      }
      const hD = Function.prototype.bind;
      function Xs(e, t) {
        return hD.call(e, t);
      }
      class pD {
        constructor(t) {
          this.partialObserver = t;
        }
        next(t) {
          const { partialObserver: n } = this;
          if (n.next)
            try {
              n.next(t);
            } catch (r) {
              ei(r);
            }
        }
        error(t) {
          const { partialObserver: n } = this;
          if (n.error)
            try {
              n.error(t);
            } catch (r) {
              ei(r);
            }
          else ei(t);
        }
        complete() {
          const { partialObserver: t } = this;
          if (t.complete)
            try {
              t.complete();
            } catch (n) {
              ei(n);
            }
        }
      }
      class jr extends Ks {
        constructor(t, n, r) {
          let o;
          if ((super(), te(t) || !t))
            o = {
              next: t ?? void 0,
              error: n ?? void 0,
              complete: r ?? void 0,
            };
          else {
            let i;
            this && yn.useDeprecatedNextContext
              ? ((i = Object.create(t)),
                (i.unsubscribe = () => this.unsubscribe()),
                (o = {
                  next: t.next && Xs(t.next, i),
                  error: t.error && Xs(t.error, i),
                  complete: t.complete && Xs(t.complete, i),
                }))
              : (o = t);
          }
          this.destination = new pD(o);
        }
      }
      function ei(e) {
        yn.useDeprecatedSynchronousErrorHandling
          ? (function fD(e) {
              yn.useDeprecatedSynchronousErrorHandling &&
                vn &&
                ((vn.errorThrown = !0), (vn.error = e));
            })(e)
          : Bc(e);
      }
      function Js(e, t) {
        const { onStoppedNotification: n } = yn;
        n && Xo.setTimeout(() => n(e, t));
      }
      const mD = {
          closed: !0,
          next: Hc,
          error: function gD(e) {
            throw e;
          },
          complete: Hc,
        },
        ea =
          ("function" == typeof Symbol && Symbol.observable) || "@@observable";
      function Dn(e) {
        return e;
      }
      function zc(e) {
        return 0 === e.length
          ? Dn
          : 1 === e.length
          ? e[0]
          : function (n) {
              return e.reduce((r, o) => o(r), n);
            };
      }
      let ve = (() => {
        class e {
          constructor(n) {
            n && (this._subscribe = n);
          }
          lift(n) {
            const r = new e();
            return (r.source = this), (r.operator = n), r;
          }
          subscribe(n, r, o) {
            const i = (function DD(e) {
              return (
                (e && e instanceof Ks) ||
                ((function vD(e) {
                  return e && te(e.next) && te(e.error) && te(e.complete);
                })(e) &&
                  Vc(e))
              );
            })(n)
              ? n
              : new jr(n, r, o);
            return (
              Jo(() => {
                const { operator: s, source: a } = this;
                i.add(
                  s
                    ? s.call(i, a)
                    : a
                    ? this._subscribe(i)
                    : this._trySubscribe(i)
                );
              }),
              i
            );
          }
          _trySubscribe(n) {
            try {
              return this._subscribe(n);
            } catch (r) {
              n.error(r);
            }
          }
          forEach(n, r) {
            return new (r = Gc(r))((o, i) => {
              const s = new jr({
                next: (a) => {
                  try {
                    n(a);
                  } catch (u) {
                    i(u), s.unsubscribe();
                  }
                },
                error: i,
                complete: o,
              });
              this.subscribe(s);
            });
          }
          _subscribe(n) {
            var r;
            return null === (r = this.source) || void 0 === r
              ? void 0
              : r.subscribe(n);
          }
          [ea]() {
            return this;
          }
          pipe(...n) {
            return zc(n)(this);
          }
          toPromise(n) {
            return new (n = Gc(n))((r, o) => {
              let i;
              this.subscribe(
                (s) => (i = s),
                (s) => o(s),
                () => r(i)
              );
            });
          }
        }
        return (e.create = (t) => new e(t)), e;
      })();
      function Gc(e) {
        var t;
        return null !== (t = e ?? yn.Promise) && void 0 !== t ? t : Promise;
      }
      const wD = Lr(
        (e) =>
          function () {
            e(this),
              (this.name = "ObjectUnsubscribedError"),
              (this.message = "object unsubscribed");
          }
      );
      let kt = (() => {
        class e extends ve {
          constructor() {
            super(),
              (this.closed = !1),
              (this.currentObservers = null),
              (this.observers = []),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          lift(n) {
            const r = new Wc(this, this);
            return (r.operator = n), r;
          }
          _throwIfClosed() {
            if (this.closed) throw new wD();
          }
          next(n) {
            Jo(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.currentObservers ||
                  (this.currentObservers = Array.from(this.observers));
                for (const r of this.currentObservers) r.next(n);
              }
            });
          }
          error(n) {
            Jo(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                (this.hasError = this.isStopped = !0), (this.thrownError = n);
                const { observers: r } = this;
                for (; r.length; ) r.shift().error(n);
              }
            });
          }
          complete() {
            Jo(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.isStopped = !0;
                const { observers: n } = this;
                for (; n.length; ) n.shift().complete();
              }
            });
          }
          unsubscribe() {
            (this.isStopped = this.closed = !0),
              (this.observers = this.currentObservers = null);
          }
          get observed() {
            var n;
            return (
              (null === (n = this.observers) || void 0 === n
                ? void 0
                : n.length) > 0
            );
          }
          _trySubscribe(n) {
            return this._throwIfClosed(), super._trySubscribe(n);
          }
          _subscribe(n) {
            return (
              this._throwIfClosed(),
              this._checkFinalizedStatuses(n),
              this._innerSubscribe(n)
            );
          }
          _innerSubscribe(n) {
            const { hasError: r, isStopped: o, observers: i } = this;
            return r || o
              ? $c
              : ((this.currentObservers = null),
                i.push(n),
                new rt(() => {
                  (this.currentObservers = null), kr(i, n);
                }));
          }
          _checkFinalizedStatuses(n) {
            const { hasError: r, thrownError: o, isStopped: i } = this;
            r ? n.error(o) : i && n.complete();
          }
          asObservable() {
            const n = new ve();
            return (n.source = this), n;
          }
        }
        return (e.create = (t, n) => new Wc(t, n)), e;
      })();
      class Wc extends kt {
        constructor(t, n) {
          super(), (this.destination = t), (this.source = n);
        }
        next(t) {
          var n, r;
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.next) ||
            void 0 === r ||
            r.call(n, t);
        }
        error(t) {
          var n, r;
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.error) ||
            void 0 === r ||
            r.call(n, t);
        }
        complete() {
          var t, n;
          null ===
            (n =
              null === (t = this.destination) || void 0 === t
                ? void 0
                : t.complete) ||
            void 0 === n ||
            n.call(t);
        }
        _subscribe(t) {
          var n, r;
          return null !==
            (r =
              null === (n = this.source) || void 0 === n
                ? void 0
                : n.subscribe(t)) && void 0 !== r
            ? r
            : $c;
        }
      }
      function qc(e) {
        return te(e?.lift);
      }
      function Ee(e) {
        return (t) => {
          if (qc(t))
            return t.lift(function (n) {
              try {
                return e(n, this);
              } catch (r) {
                this.error(r);
              }
            });
          throw new TypeError("Unable to lift unknown Observable type");
        };
      }
      function Ie(e, t, n, r, o) {
        return new CD(e, t, n, r, o);
      }
      class CD extends Ks {
        constructor(t, n, r, o, i, s) {
          super(t),
            (this.onFinalize = i),
            (this.shouldUnsubscribe = s),
            (this._next = n
              ? function (a) {
                  try {
                    n(a);
                  } catch (u) {
                    t.error(u);
                  }
                }
              : super._next),
            (this._error = o
              ? function (a) {
                  try {
                    o(a);
                  } catch (u) {
                    t.error(u);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._error),
            (this._complete = r
              ? function () {
                  try {
                    r();
                  } catch (a) {
                    t.error(a);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._complete);
        }
        unsubscribe() {
          var t;
          if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            const { closed: n } = this;
            super.unsubscribe(),
              !n &&
                (null === (t = this.onFinalize) ||
                  void 0 === t ||
                  t.call(this));
          }
        }
      }
      function H(e, t) {
        return Ee((n, r) => {
          let o = 0;
          n.subscribe(
            Ie(r, (i) => {
              r.next(e.call(t, i, o++));
            })
          );
        });
      }
      function wn(e) {
        return this instanceof wn ? ((this.v = e), this) : new wn(e);
      }
      function SD(e) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var n,
          t = e[Symbol.asyncIterator];
        return t
          ? t.call(e)
          : ((e = (function Yc(e) {
              var t = "function" == typeof Symbol && Symbol.iterator,
                n = t && e[t],
                r = 0;
              if (n) return n.call(e);
              if (e && "number" == typeof e.length)
                return {
                  next: function () {
                    return (
                      e && r >= e.length && (e = void 0),
                      { value: e && e[r++], done: !e }
                    );
                  },
                };
              throw new TypeError(
                t
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined."
              );
            })(e)),
            (n = {}),
            r("next"),
            r("throw"),
            r("return"),
            (n[Symbol.asyncIterator] = function () {
              return this;
            }),
            n);
        function r(i) {
          n[i] =
            e[i] &&
            function (s) {
              return new Promise(function (a, u) {
                !(function o(i, s, a, u) {
                  Promise.resolve(u).then(function (l) {
                    i({ value: l, done: a });
                  }, s);
                })(a, u, (s = e[i](s)).done, s.value);
              });
            };
        }
      }
      const Kc = (e) =>
        e && "number" == typeof e.length && "function" != typeof e;
      function Xc(e) {
        return te(e?.then);
      }
      function Jc(e) {
        return te(e[ea]);
      }
      function ed(e) {
        return Symbol.asyncIterator && te(e?.[Symbol.asyncIterator]);
      }
      function td(e) {
        return new TypeError(
          `You provided ${
            null !== e && "object" == typeof e ? "an invalid object" : `'${e}'`
          } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
        );
      }
      const nd = (function MD() {
        return "function" == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : "@@iterator";
      })();
      function rd(e) {
        return te(e?.[nd]);
      }
      function od(e) {
        return (function ID(e, t, n) {
          if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
          var o,
            r = n.apply(e, t || []),
            i = [];
          return (
            (o = {}),
            s("next"),
            s("throw"),
            s("return"),
            (o[Symbol.asyncIterator] = function () {
              return this;
            }),
            o
          );
          function s(f) {
            r[f] &&
              (o[f] = function (h) {
                return new Promise(function (p, g) {
                  i.push([f, h, p, g]) > 1 || a(f, h);
                });
              });
          }
          function a(f, h) {
            try {
              !(function u(f) {
                f.value instanceof wn
                  ? Promise.resolve(f.value.v).then(l, c)
                  : d(i[0][2], f);
              })(r[f](h));
            } catch (p) {
              d(i[0][3], p);
            }
          }
          function l(f) {
            a("next", f);
          }
          function c(f) {
            a("throw", f);
          }
          function d(f, h) {
            f(h), i.shift(), i.length && a(i[0][0], i[0][1]);
          }
        })(this, arguments, function* () {
          const n = e.getReader();
          try {
            for (;;) {
              const { value: r, done: o } = yield wn(n.read());
              if (o) return yield wn(void 0);
              yield yield wn(r);
            }
          } finally {
            n.releaseLock();
          }
        });
      }
      function id(e) {
        return te(e?.getReader);
      }
      function ft(e) {
        if (e instanceof ve) return e;
        if (null != e) {
          if (Jc(e))
            return (function TD(e) {
              return new ve((t) => {
                const n = e[ea]();
                if (te(n.subscribe)) return n.subscribe(t);
                throw new TypeError(
                  "Provided object does not correctly implement Symbol.observable"
                );
              });
            })(e);
          if (Kc(e))
            return (function AD(e) {
              return new ve((t) => {
                for (let n = 0; n < e.length && !t.closed; n++) t.next(e[n]);
                t.complete();
              });
            })(e);
          if (Xc(e))
            return (function RD(e) {
              return new ve((t) => {
                e.then(
                  (n) => {
                    t.closed || (t.next(n), t.complete());
                  },
                  (n) => t.error(n)
                ).then(null, Bc);
              });
            })(e);
          if (ed(e)) return sd(e);
          if (rd(e))
            return (function xD(e) {
              return new ve((t) => {
                for (const n of e) if ((t.next(n), t.closed)) return;
                t.complete();
              });
            })(e);
          if (id(e))
            return (function ND(e) {
              return sd(od(e));
            })(e);
        }
        throw td(e);
      }
      function sd(e) {
        return new ve((t) => {
          (function PD(e, t) {
            var n, r, o, i;
            return (function _D(e, t, n, r) {
              return new (n || (n = Promise))(function (i, s) {
                function a(c) {
                  try {
                    l(r.next(c));
                  } catch (d) {
                    s(d);
                  }
                }
                function u(c) {
                  try {
                    l(r.throw(c));
                  } catch (d) {
                    s(d);
                  }
                }
                function l(c) {
                  c.done
                    ? i(c.value)
                    : (function o(i) {
                        return i instanceof n
                          ? i
                          : new n(function (s) {
                              s(i);
                            });
                      })(c.value).then(a, u);
                }
                l((r = r.apply(e, t || [])).next());
              });
            })(this, void 0, void 0, function* () {
              try {
                for (n = SD(e); !(r = yield n.next()).done; )
                  if ((t.next(r.value), t.closed)) return;
              } catch (s) {
                o = { error: s };
              } finally {
                try {
                  r && !r.done && (i = n.return) && (yield i.call(n));
                } finally {
                  if (o) throw o.error;
                }
              }
              t.complete();
            });
          })(e, t).catch((n) => t.error(n));
        });
      }
      function jt(e, t, n, r = 0, o = !1) {
        const i = t.schedule(function () {
          n(), o ? e.add(this.schedule(null, r)) : this.unsubscribe();
        }, r);
        if ((e.add(i), !o)) return i;
      }
      function Se(e, t, n = 1 / 0) {
        return te(t)
          ? Se((r, o) => H((i, s) => t(r, i, o, s))(ft(e(r, o))), n)
          : ("number" == typeof t && (n = t),
            Ee((r, o) =>
              (function OD(e, t, n, r, o, i, s, a) {
                const u = [];
                let l = 0,
                  c = 0,
                  d = !1;
                const f = () => {
                    d && !u.length && !l && t.complete();
                  },
                  h = (g) => (l < r ? p(g) : u.push(g)),
                  p = (g) => {
                    i && t.next(g), l++;
                    let m = !1;
                    ft(n(g, c++)).subscribe(
                      Ie(
                        t,
                        (D) => {
                          o?.(D), i ? h(D) : t.next(D);
                        },
                        () => {
                          m = !0;
                        },
                        void 0,
                        () => {
                          if (m)
                            try {
                              for (l--; u.length && l < r; ) {
                                const D = u.shift();
                                s ? jt(t, s, () => p(D)) : p(D);
                              }
                              f();
                            } catch (D) {
                              t.error(D);
                            }
                        }
                      )
                    );
                  };
                return (
                  e.subscribe(
                    Ie(t, h, () => {
                      (d = !0), f();
                    })
                  ),
                  () => {
                    a?.();
                  }
                );
              })(r, o, e, n)
            ));
      }
      function Vn(e = 1 / 0) {
        return Se(Dn, e);
      }
      const It = new ve((e) => e.complete());
      function na(e) {
        return e[e.length - 1];
      }
      function $r(e) {
        return (function LD(e) {
          return e && te(e.schedule);
        })(na(e))
          ? e.pop()
          : void 0;
      }
      function ad(e, t = 0) {
        return Ee((n, r) => {
          n.subscribe(
            Ie(
              r,
              (o) => jt(r, e, () => r.next(o), t),
              () => jt(r, e, () => r.complete(), t),
              (o) => jt(r, e, () => r.error(o), t)
            )
          );
        });
      }
      function ud(e, t = 0) {
        return Ee((n, r) => {
          r.add(e.schedule(() => n.subscribe(r), t));
        });
      }
      function ld(e, t) {
        if (!e) throw new Error("Iterable cannot be null");
        return new ve((n) => {
          jt(n, t, () => {
            const r = e[Symbol.asyncIterator]();
            jt(
              n,
              t,
              () => {
                r.next().then((o) => {
                  o.done ? n.complete() : n.next(o.value);
                });
              },
              0,
              !0
            );
          });
        });
      }
      function De(e, t) {
        return t
          ? (function zD(e, t) {
              if (null != e) {
                if (Jc(e))
                  return (function $D(e, t) {
                    return ft(e).pipe(ud(t), ad(t));
                  })(e, t);
                if (Kc(e))
                  return (function UD(e, t) {
                    return new ve((n) => {
                      let r = 0;
                      return t.schedule(function () {
                        r === e.length
                          ? n.complete()
                          : (n.next(e[r++]), n.closed || this.schedule());
                      });
                    });
                  })(e, t);
                if (Xc(e))
                  return (function VD(e, t) {
                    return ft(e).pipe(ud(t), ad(t));
                  })(e, t);
                if (ed(e)) return ld(e, t);
                if (rd(e))
                  return (function BD(e, t) {
                    return new ve((n) => {
                      let r;
                      return (
                        jt(n, t, () => {
                          (r = e[nd]()),
                            jt(
                              n,
                              t,
                              () => {
                                let o, i;
                                try {
                                  ({ value: o, done: i } = r.next());
                                } catch (s) {
                                  return void n.error(s);
                                }
                                i ? n.complete() : n.next(o);
                              },
                              0,
                              !0
                            );
                        }),
                        () => te(r?.return) && r.return()
                      );
                    });
                  })(e, t);
                if (id(e))
                  return (function HD(e, t) {
                    return ld(od(e), t);
                  })(e, t);
              }
              throw td(e);
            })(e, t)
          : ft(e);
      }
      function ra(e, t, ...n) {
        if (!0 === t) return void e();
        if (!1 === t) return;
        const r = new jr({
          next: () => {
            r.unsubscribe(), e();
          },
        });
        return ft(t(...n)).subscribe(r);
      }
      function J(e) {
        for (let t in e) if (e[t] === J) return t;
        throw Error("Could not find renamed property on target object.");
      }
      function ne(e) {
        if ("string" == typeof e) return e;
        if (Array.isArray(e)) return "[" + e.map(ne).join(", ") + "]";
        if (null == e) return "" + e;
        if (e.overriddenName) return `${e.overriddenName}`;
        if (e.name) return `${e.name}`;
        const t = e.toString();
        if (null == t) return "" + t;
        const n = t.indexOf("\n");
        return -1 === n ? t : t.substring(0, n);
      }
      function ia(e, t) {
        return null == e || "" === e
          ? null === t
            ? ""
            : t
          : null == t || "" === t
          ? e
          : e + " " + t;
      }
      const qD = J({ __forward_ref__: J });
      function sa(e) {
        return (
          (e.__forward_ref__ = sa),
          (e.toString = function () {
            return ne(this());
          }),
          e
        );
      }
      function b(e) {
        return aa(e) ? e() : e;
      }
      function aa(e) {
        return (
          "function" == typeof e &&
          e.hasOwnProperty(qD) &&
          e.__forward_ref__ === sa
        );
      }
      function ua(e) {
        return e && !!e.ɵproviders;
      }
      class w extends Error {
        constructor(t, n) {
          super(ti(t, n)), (this.code = t);
        }
      }
      function ti(e, t) {
        return `NG0${Math.abs(e)}${t ? ": " + t.trim() : ""}`;
      }
      function Q(e) {
        return "function" == typeof e
          ? e.name || e.toString()
          : "object" == typeof e && null != e && "function" == typeof e.type
          ? e.type.name || e.type.toString()
          : (function O(e) {
              return "string" == typeof e ? e : null == e ? "" : String(e);
            })(e);
      }
      function ni(e, t) {
        throw new w(-201, !1);
      }
      function ot(e, t) {
        null == e &&
          (function Y(e, t, n, r) {
            throw new Error(
              `ASSERTION ERROR: ${e}` +
                (null == r ? "" : ` [Expected=> ${n} ${r} ${t} <=Actual]`)
            );
          })(t, e, null, "!=");
      }
      function P(e) {
        return {
          token: e.token,
          providedIn: e.providedIn || null,
          factory: e.factory,
          value: void 0,
        };
      }
      function rn(e) {
        return { providers: e.providers || [], imports: e.imports || [] };
      }
      function ri(e) {
        return dd(e, oi) || dd(e, hd);
      }
      function dd(e, t) {
        return e.hasOwnProperty(t) ? e[t] : null;
      }
      function fd(e) {
        return e && (e.hasOwnProperty(la) || e.hasOwnProperty(nw))
          ? e[la]
          : null;
      }
      const oi = J({ ɵprov: J }),
        la = J({ ɵinj: J }),
        hd = J({ ngInjectableDef: J }),
        nw = J({ ngInjectorDef: J });
      var M = (() => (
        ((M = M || {})[(M.Default = 0)] = "Default"),
        (M[(M.Host = 1)] = "Host"),
        (M[(M.Self = 2)] = "Self"),
        (M[(M.SkipSelf = 4)] = "SkipSelf"),
        (M[(M.Optional = 8)] = "Optional"),
        M
      ))();
      let ca;
      function it(e) {
        const t = ca;
        return (ca = e), t;
      }
      function pd(e, t, n) {
        const r = ri(e);
        return r && "root" == r.providedIn
          ? void 0 === r.value
            ? (r.value = r.factory())
            : r.value
          : n & M.Optional
          ? null
          : void 0 !== t
          ? t
          : void ni(ne(e));
      }
      const oe = (() =>
          (typeof globalThis < "u" && globalThis) ||
          (typeof global < "u" && global) ||
          (typeof window < "u" && window) ||
          (typeof self < "u" &&
            typeof WorkerGlobalScope < "u" &&
            self instanceof WorkerGlobalScope &&
            self))(),
        Vr = {},
        da = "__NG_DI_FLAG__",
        ii = "ngTempTokenPath",
        ow = "ngTokenPath",
        iw = /\n/gm,
        sw = "\u0275",
        gd = "__source";
      let Ur;
      function Un(e) {
        const t = Ur;
        return (Ur = e), t;
      }
      function aw(e, t = M.Default) {
        if (void 0 === Ur) throw new w(-203, !1);
        return null === Ur
          ? pd(e, void 0, t)
          : Ur.get(e, t & M.Optional ? null : void 0, t);
      }
      function T(e, t = M.Default) {
        return (
          (function rw() {
            return ca;
          })() || aw
        )(b(e), t);
      }
      function z(e, t = M.Default) {
        return T(e, si(t));
      }
      function si(e) {
        return typeof e > "u" || "number" == typeof e
          ? e
          : 0 |
              (e.optional && 8) |
              (e.host && 1) |
              (e.self && 2) |
              (e.skipSelf && 4);
      }
      function fa(e) {
        const t = [];
        for (let n = 0; n < e.length; n++) {
          const r = b(e[n]);
          if (Array.isArray(r)) {
            if (0 === r.length) throw new w(900, !1);
            let o,
              i = M.Default;
            for (let s = 0; s < r.length; s++) {
              const a = r[s],
                u = uw(a);
              "number" == typeof u
                ? -1 === u
                  ? (o = a.token)
                  : (i |= u)
                : (o = a);
            }
            t.push(T(o, i));
          } else t.push(T(r));
        }
        return t;
      }
      function Br(e, t) {
        return (e[da] = t), (e.prototype[da] = t), e;
      }
      function uw(e) {
        return e[da];
      }
      function $t(e) {
        return { toString: e }.toString();
      }
      var St = (() => (
          ((St = St || {})[(St.OnPush = 0)] = "OnPush"),
          (St[(St.Default = 1)] = "Default"),
          St
        ))(),
        bt = (() => {
          return (
            ((e = bt || (bt = {}))[(e.Emulated = 0)] = "Emulated"),
            (e[(e.None = 2)] = "None"),
            (e[(e.ShadowDom = 3)] = "ShadowDom"),
            bt
          );
          var e;
        })();
      const Vt = {},
        Z = [],
        ai = J({ ɵcmp: J }),
        ha = J({ ɵdir: J }),
        pa = J({ ɵpipe: J }),
        yd = J({ ɵmod: J }),
        Ut = J({ ɵfac: J }),
        Hr = J({ __NG_ELEMENT_ID__: J });
      let dw = 0;
      function zr(e) {
        return $t(() => {
          const t = Dd(e),
            n = {
              ...t,
              decls: e.decls,
              vars: e.vars,
              template: e.template,
              consts: e.consts || null,
              ngContentSelectors: e.ngContentSelectors,
              onPush: e.changeDetection === St.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              dependencies: (t.standalone && e.dependencies) || null,
              getStandaloneInjector: null,
              data: e.data || {},
              encapsulation: e.encapsulation || bt.Emulated,
              id: "c" + dw++,
              styles: e.styles || Z,
              _: null,
              schemas: e.schemas || null,
              tView: null,
            };
          wd(n);
          const r = e.dependencies;
          return (n.directiveDefs = ui(r, !1)), (n.pipeDefs = ui(r, !0)), n;
        });
      }
      function hw(e) {
        return K(e) || Ae(e);
      }
      function pw(e) {
        return null !== e;
      }
      function Cn(e) {
        return $t(() => ({
          type: e.type,
          bootstrap: e.bootstrap || Z,
          declarations: e.declarations || Z,
          imports: e.imports || Z,
          exports: e.exports || Z,
          transitiveCompileScopes: null,
          schemas: e.schemas || null,
          id: e.id || null,
        }));
      }
      function vd(e, t) {
        if (null == e) return Vt;
        const n = {};
        for (const r in e)
          if (e.hasOwnProperty(r)) {
            let o = e[r],
              i = o;
            Array.isArray(o) && ((i = o[1]), (o = o[0])),
              (n[o] = r),
              t && (t[o] = i);
          }
        return n;
      }
      function Fe(e) {
        return $t(() => {
          const t = Dd(e);
          return wd(t), t;
        });
      }
      function K(e) {
        return e[ai] || null;
      }
      function Ae(e) {
        return e[ha] || null;
      }
      function He(e) {
        return e[pa] || null;
      }
      function Qe(e, t) {
        const n = e[yd] || null;
        if (!n && !0 === t)
          throw new Error(`Type ${ne(e)} does not have '\u0275mod' property.`);
        return n;
      }
      function Dd(e) {
        const t = {};
        return {
          type: e.type,
          providersResolver: null,
          factory: null,
          hostBindings: e.hostBindings || null,
          hostVars: e.hostVars || 0,
          hostAttrs: e.hostAttrs || null,
          contentQueries: e.contentQueries || null,
          declaredInputs: t,
          exportAs: e.exportAs || null,
          standalone: !0 === e.standalone,
          selectors: e.selectors || Z,
          viewQuery: e.viewQuery || null,
          features: e.features || null,
          setInput: null,
          findHostDirectiveDefs: null,
          hostDirectives: null,
          inputs: vd(e.inputs, t),
          outputs: vd(e.outputs),
        };
      }
      function wd(e) {
        e.features?.forEach((t) => t(e));
      }
      function ui(e, t) {
        if (!e) return null;
        const n = t ? He : hw;
        return () =>
          ("function" == typeof e ? e() : e).map((r) => n(r)).filter(pw);
      }
      const Bt = 0,
        E = 1,
        j = 2,
        ue = 3,
        ht = 4,
        _n = 5,
        Re = 6,
        Hn = 7,
        ce = 8,
        li = 9,
        ci = 10,
        V = 11,
        ga = 12,
        Gr = 13,
        Cd = 14,
        zn = 15,
        xe = 16,
        Wr = 17,
        Gn = 18,
        Mt = 19,
        qr = 20,
        _d = 21,
        ie = 22,
        ma = 1,
        Ed = 2,
        di = 7,
        fi = 8,
        Wn = 9,
        Le = 10;
      function Ye(e) {
        return Array.isArray(e) && "object" == typeof e[ma];
      }
      function pt(e) {
        return Array.isArray(e) && !0 === e[ma];
      }
      function ya(e) {
        return 0 != (4 & e.flags);
      }
      function Zr(e) {
        return e.componentOffset > -1;
      }
      function gt(e) {
        return !!e.template;
      }
      function mw(e) {
        return 0 != (256 & e[j]);
      }
      function En(e, t) {
        return e.hasOwnProperty(Ut) ? e[Ut] : null;
      }
      class Dw {
        constructor(t, n, r) {
          (this.previousValue = t),
            (this.currentValue = n),
            (this.firstChange = r);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function In() {
        return bd;
      }
      function bd(e) {
        return e.type.prototype.ngOnChanges && (e.setInput = Cw), ww;
      }
      function ww() {
        const e = Td(this),
          t = e?.current;
        if (t) {
          const n = e.previous;
          if (n === Vt) e.previous = t;
          else for (let r in t) n[r] = t[r];
          (e.current = null), this.ngOnChanges(t);
        }
      }
      function Cw(e, t, n, r) {
        const o = this.declaredInputs[n],
          i =
            Td(e) ||
            (function _w(e, t) {
              return (e[Md] = t);
            })(e, { previous: Vt, current: null }),
          s = i.current || (i.current = {}),
          a = i.previous,
          u = a[o];
        (s[o] = new Dw(u && u.currentValue, t, a === Vt)), (e[r] = t);
      }
      In.ngInherit = !0;
      const Md = "__ngSimpleChanges__";
      function Td(e) {
        return e[Md] || null;
      }
      const st = function (e, t, n) {};
      function be(e) {
        for (; Array.isArray(e); ) e = e[Bt];
        return e;
      }
      function Ke(e, t) {
        return be(t[e.index]);
      }
      function Xe(e, t) {
        const n = t[e];
        return Ye(n) ? n : n[Bt];
      }
      function gi(e) {
        return 64 == (64 & e[j]);
      }
      function on(e, t) {
        return null == t ? null : e[t];
      }
      function Nd(e) {
        e[Gn] = 0;
      }
      function Da(e, t) {
        e[_n] += t;
        let n = e,
          r = e[ue];
        for (
          ;
          null !== r && ((1 === t && 1 === n[_n]) || (-1 === t && 0 === n[_n]));

        )
          (r[_n] += t), (n = r), (r = r[ue]);
      }
      const F = { lFrame: Bd(null), bindingsEnabled: !0 };
      function Od() {
        return F.bindingsEnabled;
      }
      function v() {
        return F.lFrame.lView;
      }
      function G() {
        return F.lFrame.tView;
      }
      function Me() {
        let e = Fd();
        for (; null !== e && 64 === e.type; ) e = e.parent;
        return e;
      }
      function Fd() {
        return F.lFrame.currentTNode;
      }
      function Tt(e, t) {
        const n = F.lFrame;
        (n.currentTNode = e), (n.isParent = t);
      }
      function wa() {
        return F.lFrame.isParent;
      }
      function kw(e, t) {
        const n = F.lFrame;
        (n.bindingIndex = n.bindingRootIndex = e), _a(t);
      }
      function _a(e) {
        F.lFrame.currentDirectiveIndex = e;
      }
      function Ia(e) {
        F.lFrame.currentQueryIndex = e;
      }
      function $w(e) {
        const t = e[E];
        return 2 === t.type ? t.declTNode : 1 === t.type ? e[Re] : null;
      }
      function Vd(e, t, n) {
        if (n & M.SkipSelf) {
          let o = t,
            i = e;
          for (
            ;
            !((o = o.parent),
            null !== o ||
              n & M.Host ||
              ((o = $w(i)), null === o || ((i = i[zn]), 10 & o.type)));

          );
          if (null === o) return !1;
          (t = o), (e = i);
        }
        const r = (F.lFrame = Ud());
        return (r.currentTNode = t), (r.lView = e), !0;
      }
      function Sa(e) {
        const t = Ud(),
          n = e[E];
        (F.lFrame = t),
          (t.currentTNode = n.firstChild),
          (t.lView = e),
          (t.tView = n),
          (t.contextLView = e),
          (t.bindingIndex = n.bindingStartIndex),
          (t.inI18n = !1);
      }
      function Ud() {
        const e = F.lFrame,
          t = null === e ? null : e.child;
        return null === t ? Bd(e) : t;
      }
      function Bd(e) {
        const t = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: -1,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: e,
          child: null,
          inI18n: !1,
        };
        return null !== e && (e.child = t), t;
      }
      function Hd() {
        const e = F.lFrame;
        return (
          (F.lFrame = e.parent), (e.currentTNode = null), (e.lView = null), e
        );
      }
      const zd = Hd;
      function ba() {
        const e = Hd();
        (e.isParent = !0),
          (e.tView = null),
          (e.selectedIndex = -1),
          (e.contextLView = null),
          (e.elementDepthCount = 0),
          (e.currentDirectiveIndex = -1),
          (e.currentNamespace = null),
          (e.bindingRootIndex = -1),
          (e.bindingIndex = -1),
          (e.currentQueryIndex = 0);
      }
      function Sn(e) {
        F.lFrame.selectedIndex = e;
      }
      function mi(e, t) {
        for (let n = t.directiveStart, r = t.directiveEnd; n < r; n++) {
          const i = e.data[n].type.prototype,
            {
              ngAfterContentInit: s,
              ngAfterContentChecked: a,
              ngAfterViewInit: u,
              ngAfterViewChecked: l,
              ngOnDestroy: c,
            } = i;
          s && (e.contentHooks || (e.contentHooks = [])).push(-n, s),
            a &&
              ((e.contentHooks || (e.contentHooks = [])).push(n, a),
              (e.contentCheckHooks || (e.contentCheckHooks = [])).push(n, a)),
            u && (e.viewHooks || (e.viewHooks = [])).push(-n, u),
            l &&
              ((e.viewHooks || (e.viewHooks = [])).push(n, l),
              (e.viewCheckHooks || (e.viewCheckHooks = [])).push(n, l)),
            null != c && (e.destroyHooks || (e.destroyHooks = [])).push(n, c);
        }
      }
      function yi(e, t, n) {
        Gd(e, t, 3, n);
      }
      function vi(e, t, n, r) {
        (3 & e[j]) === n && Gd(e, t, n, r);
      }
      function Ma(e, t) {
        let n = e[j];
        (3 & n) === t && ((n &= 2047), (n += 1), (e[j] = n));
      }
      function Gd(e, t, n, r) {
        const i = r ?? -1,
          s = t.length - 1;
        let a = 0;
        for (let u = void 0 !== r ? 65535 & e[Gn] : 0; u < s; u++)
          if ("number" == typeof t[u + 1]) {
            if (((a = t[u]), null != r && a >= r)) break;
          } else
            t[u] < 0 && (e[Gn] += 65536),
              (a < i || -1 == i) &&
                (Zw(e, n, t, u), (e[Gn] = (4294901760 & e[Gn]) + u + 2)),
              u++;
      }
      function Zw(e, t, n, r) {
        const o = n[r] < 0,
          i = n[r + 1],
          a = e[o ? -n[r] : n[r]];
        if (o) {
          if (e[j] >> 11 < e[Gn] >> 16 && (3 & e[j]) === t) {
            (e[j] += 2048), st(4, a, i);
            try {
              i.call(a);
            } finally {
              st(5, a, i);
            }
          }
        } else {
          st(4, a, i);
          try {
            i.call(a);
          } finally {
            st(5, a, i);
          }
        }
      }
      const Qn = -1;
      class Yr {
        constructor(t, n, r) {
          (this.factory = t),
            (this.resolving = !1),
            (this.canSeeViewProviders = n),
            (this.injectImpl = r);
        }
      }
      function Aa(e, t, n) {
        let r = 0;
        for (; r < n.length; ) {
          const o = n[r];
          if ("number" == typeof o) {
            if (0 !== o) break;
            r++;
            const i = n[r++],
              s = n[r++],
              a = n[r++];
            e.setAttribute(t, s, a, i);
          } else {
            const i = o,
              s = n[++r];
            qd(i) ? e.setProperty(t, i, s) : e.setAttribute(t, i, s), r++;
          }
        }
        return r;
      }
      function Wd(e) {
        return 3 === e || 4 === e || 6 === e;
      }
      function qd(e) {
        return 64 === e.charCodeAt(0);
      }
      function Kr(e, t) {
        if (null !== t && 0 !== t.length)
          if (null === e || 0 === e.length) e = t.slice();
          else {
            let n = -1;
            for (let r = 0; r < t.length; r++) {
              const o = t[r];
              "number" == typeof o
                ? (n = o)
                : 0 === n ||
                  Zd(e, n, o, null, -1 === n || 2 === n ? t[++r] : null);
            }
          }
        return e;
      }
      function Zd(e, t, n, r, o) {
        let i = 0,
          s = e.length;
        if (-1 === t) s = -1;
        else
          for (; i < e.length; ) {
            const a = e[i++];
            if ("number" == typeof a) {
              if (a === t) {
                s = -1;
                break;
              }
              if (a > t) {
                s = i - 1;
                break;
              }
            }
          }
        for (; i < e.length; ) {
          const a = e[i];
          if ("number" == typeof a) break;
          if (a === n) {
            if (null === r) return void (null !== o && (e[i + 1] = o));
            if (r === e[i + 1]) return void (e[i + 2] = o);
          }
          i++, null !== r && i++, null !== o && i++;
        }
        -1 !== s && (e.splice(s, 0, t), (i = s + 1)),
          e.splice(i++, 0, n),
          null !== r && e.splice(i++, 0, r),
          null !== o && e.splice(i++, 0, o);
      }
      function Qd(e) {
        return e !== Qn;
      }
      function Di(e) {
        return 32767 & e;
      }
      function wi(e, t) {
        let n = (function Xw(e) {
            return e >> 16;
          })(e),
          r = t;
        for (; n > 0; ) (r = r[zn]), n--;
        return r;
      }
      let Ra = !0;
      function Ci(e) {
        const t = Ra;
        return (Ra = e), t;
      }
      const Yd = 255,
        Kd = 5;
      let Jw = 0;
      const At = {};
      function _i(e, t) {
        const n = Xd(e, t);
        if (-1 !== n) return n;
        const r = t[E];
        r.firstCreatePass &&
          ((e.injectorIndex = t.length),
          xa(r.data, e),
          xa(t, null),
          xa(r.blueprint, null));
        const o = Na(e, t),
          i = e.injectorIndex;
        if (Qd(o)) {
          const s = Di(o),
            a = wi(o, t),
            u = a[E].data;
          for (let l = 0; l < 8; l++) t[i + l] = a[s + l] | u[s + l];
        }
        return (t[i + 8] = o), i;
      }
      function xa(e, t) {
        e.push(0, 0, 0, 0, 0, 0, 0, 0, t);
      }
      function Xd(e, t) {
        return -1 === e.injectorIndex ||
          (e.parent && e.parent.injectorIndex === e.injectorIndex) ||
          null === t[e.injectorIndex + 8]
          ? -1
          : e.injectorIndex;
      }
      function Na(e, t) {
        if (e.parent && -1 !== e.parent.injectorIndex)
          return e.parent.injectorIndex;
        let n = 0,
          r = null,
          o = t;
        for (; null !== o; ) {
          if (((r = uf(o)), null === r)) return Qn;
          if ((n++, (o = o[zn]), -1 !== r.injectorIndex))
            return r.injectorIndex | (n << 16);
        }
        return Qn;
      }
      function Pa(e, t, n) {
        !(function eC(e, t, n) {
          let r;
          "string" == typeof n
            ? (r = n.charCodeAt(0) || 0)
            : n.hasOwnProperty(Hr) && (r = n[Hr]),
            null == r && (r = n[Hr] = Jw++);
          const o = r & Yd;
          t.data[e + (o >> Kd)] |= 1 << o;
        })(e, t, n);
      }
      function Jd(e, t, n) {
        if (n & M.Optional || void 0 !== e) return e;
        ni();
      }
      function ef(e, t, n, r) {
        if (
          (n & M.Optional && void 0 === r && (r = null),
          !(n & (M.Self | M.Host)))
        ) {
          const o = e[li],
            i = it(void 0);
          try {
            return o ? o.get(t, r, n & M.Optional) : pd(t, r, n & M.Optional);
          } finally {
            it(i);
          }
        }
        return Jd(r, 0, n);
      }
      function tf(e, t, n, r = M.Default, o) {
        if (null !== e) {
          if (1024 & t[j]) {
            const s = (function iC(e, t, n, r, o) {
              let i = e,
                s = t;
              for (
                ;
                null !== i && null !== s && 1024 & s[j] && !(256 & s[j]);

              ) {
                const a = nf(i, s, n, r | M.Self, At);
                if (a !== At) return a;
                let u = i.parent;
                if (!u) {
                  const l = s[_d];
                  if (l) {
                    const c = l.get(n, At, r);
                    if (c !== At) return c;
                  }
                  (u = uf(s)), (s = s[zn]);
                }
                i = u;
              }
              return o;
            })(e, t, n, r, At);
            if (s !== At) return s;
          }
          const i = nf(e, t, n, r, At);
          if (i !== At) return i;
        }
        return ef(t, n, r, o);
      }
      function nf(e, t, n, r, o) {
        const i = (function rC(e) {
          if ("string" == typeof e) return e.charCodeAt(0) || 0;
          const t = e.hasOwnProperty(Hr) ? e[Hr] : void 0;
          return "number" == typeof t ? (t >= 0 ? t & Yd : oC) : t;
        })(n);
        if ("function" == typeof i) {
          if (!Vd(t, e, r)) return r & M.Host ? Jd(o, 0, r) : ef(t, n, r, o);
          try {
            const s = i(r);
            if (null != s || r & M.Optional) return s;
            ni();
          } finally {
            zd();
          }
        } else if ("number" == typeof i) {
          let s = null,
            a = Xd(e, t),
            u = Qn,
            l = r & M.Host ? t[xe][Re] : null;
          for (
            (-1 === a || r & M.SkipSelf) &&
            ((u = -1 === a ? Na(e, t) : t[a + 8]),
            u !== Qn && sf(r, !1)
              ? ((s = t[E]), (a = Di(u)), (t = wi(u, t)))
              : (a = -1));
            -1 !== a;

          ) {
            const c = t[E];
            if (rf(i, a, c.data)) {
              const d = nC(a, t, n, s, r, l);
              if (d !== At) return d;
            }
            (u = t[a + 8]),
              u !== Qn && sf(r, t[E].data[a + 8] === l) && rf(i, a, t)
                ? ((s = c), (a = Di(u)), (t = wi(u, t)))
                : (a = -1);
          }
        }
        return o;
      }
      function nC(e, t, n, r, o, i) {
        const s = t[E],
          a = s.data[e + 8],
          c = (function Ei(e, t, n, r, o) {
            const i = e.providerIndexes,
              s = t.data,
              a = 1048575 & i,
              u = e.directiveStart,
              c = i >> 20,
              f = o ? a + c : e.directiveEnd;
            for (let h = r ? a : a + c; h < f; h++) {
              const p = s[h];
              if ((h < u && n === p) || (h >= u && p.type === n)) return h;
            }
            if (o) {
              const h = s[u];
              if (h && gt(h) && h.type === n) return u;
            }
            return null;
          })(
            a,
            s,
            n,
            null == r ? Zr(a) && Ra : r != s && 0 != (3 & a.type),
            o & M.Host && i === a
          );
        return null !== c ? bn(t, s, c, a) : At;
      }
      function bn(e, t, n, r) {
        let o = e[n];
        const i = t.data;
        if (
          (function Qw(e) {
            return e instanceof Yr;
          })(o)
        ) {
          const s = o;
          s.resolving &&
            (function ZD(e, t) {
              const n = t ? `. Dependency path: ${t.join(" > ")} > ${e}` : "";
              throw new w(
                -200,
                `Circular dependency in DI detected for ${e}${n}`
              );
            })(Q(i[n]));
          const a = Ci(s.canSeeViewProviders);
          s.resolving = !0;
          const u = s.injectImpl ? it(s.injectImpl) : null;
          Vd(e, r, M.Default);
          try {
            (o = e[n] = s.factory(void 0, i, e, r)),
              t.firstCreatePass &&
                n >= r.directiveStart &&
                (function qw(e, t, n) {
                  const {
                    ngOnChanges: r,
                    ngOnInit: o,
                    ngDoCheck: i,
                  } = t.type.prototype;
                  if (r) {
                    const s = bd(t);
                    (n.preOrderHooks || (n.preOrderHooks = [])).push(e, s),
                      (
                        n.preOrderCheckHooks || (n.preOrderCheckHooks = [])
                      ).push(e, s);
                  }
                  o &&
                    (n.preOrderHooks || (n.preOrderHooks = [])).push(0 - e, o),
                    i &&
                      ((n.preOrderHooks || (n.preOrderHooks = [])).push(e, i),
                      (
                        n.preOrderCheckHooks || (n.preOrderCheckHooks = [])
                      ).push(e, i));
                })(n, i[n], t);
          } finally {
            null !== u && it(u), Ci(a), (s.resolving = !1), zd();
          }
        }
        return o;
      }
      function rf(e, t, n) {
        return !!(n[t + (e >> Kd)] & (1 << e));
      }
      function sf(e, t) {
        return !(e & M.Self || (e & M.Host && t));
      }
      class Yn {
        constructor(t, n) {
          (this._tNode = t), (this._lView = n);
        }
        get(t, n, r) {
          return tf(this._tNode, this._lView, t, si(r), n);
        }
      }
      function oC() {
        return new Yn(Me(), v());
      }
      function Oa(e) {
        return aa(e)
          ? () => {
              const t = Oa(b(e));
              return t && t();
            }
          : En(e);
      }
      function uf(e) {
        const t = e[E],
          n = t.type;
        return 2 === n ? t.declTNode : 1 === n ? e[Re] : null;
      }
      const Xn = "__parameters__";
      function er(e, t, n) {
        return $t(() => {
          const r = (function Fa(e) {
            return function (...n) {
              if (e) {
                const r = e(...n);
                for (const o in r) this[o] = r[o];
              }
            };
          })(t);
          function o(...i) {
            if (this instanceof o) return r.apply(this, i), this;
            const s = new o(...i);
            return (a.annotation = s), a;
            function a(u, l, c) {
              const d = u.hasOwnProperty(Xn)
                ? u[Xn]
                : Object.defineProperty(u, Xn, { value: [] })[Xn];
              for (; d.length <= c; ) d.push(null);
              return (d[c] = d[c] || []).push(s), u;
            }
          }
          return (
            n && (o.prototype = Object.create(n.prototype)),
            (o.prototype.ngMetadataName = e),
            (o.annotationCls = o),
            o
          );
        });
      }
      class A {
        constructor(t, n) {
          (this._desc = t),
            (this.ngMetadataName = "InjectionToken"),
            (this.ɵprov = void 0),
            "number" == typeof n
              ? (this.__NG_ELEMENT_ID__ = n)
              : void 0 !== n &&
                (this.ɵprov = P({
                  token: this,
                  providedIn: n.providedIn || "root",
                  factory: n.factory,
                }));
        }
        get multi() {
          return this;
        }
        toString() {
          return `InjectionToken ${this._desc}`;
        }
      }
      function Mn(e, t) {
        e.forEach((n) => (Array.isArray(n) ? Mn(n, t) : t(n)));
      }
      function cf(e, t, n) {
        t >= e.length ? e.push(n) : e.splice(t, 0, n);
      }
      function Si(e, t) {
        return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0];
      }
      const to = Br(er("Optional"), 8),
        no = Br(er("SkipSelf"), 4);
      var ze = (() => (
        ((ze = ze || {})[(ze.Important = 1)] = "Important"),
        (ze[(ze.DashCase = 2)] = "DashCase"),
        ze
      ))();
      const Ha = new Map();
      let xC = 0;
      const Ga = "__ngContext__";
      function Ne(e, t) {
        Ye(t)
          ? ((e[Ga] = t[qr]),
            (function PC(e) {
              Ha.set(e[qr], e);
            })(t))
          : (e[Ga] = t);
      }
      let Wa;
      function qa(e, t) {
        return Wa(e, t);
      }
      function so(e) {
        const t = e[ue];
        return pt(t) ? t[ue] : t;
      }
      function Za(e) {
        return xf(e[Gr]);
      }
      function Qa(e) {
        return xf(e[ht]);
      }
      function xf(e) {
        for (; null !== e && !pt(e); ) e = e[ht];
        return e;
      }
      function rr(e, t, n, r, o) {
        if (null != r) {
          let i,
            s = !1;
          pt(r) ? (i = r) : Ye(r) && ((s = !0), (r = r[Bt]));
          const a = be(r);
          0 === e && null !== n
            ? null == o
              ? kf(t, n, a)
              : Tn(t, n, a, o || null, !0)
            : 1 === e && null !== n
            ? Tn(t, n, a, o || null, !0)
            : 2 === e
            ? (function nu(e, t, n) {
                const r = Ai(e, t);
                r &&
                  (function JC(e, t, n, r) {
                    e.removeChild(t, n, r);
                  })(e, r, t, n);
              })(t, a, s)
            : 3 === e && t.destroyNode(a),
            null != i &&
              (function n_(e, t, n, r, o) {
                const i = n[di];
                i !== be(n) && rr(t, e, r, i, o);
                for (let a = Le; a < n.length; a++) {
                  const u = n[a];
                  ao(u[E], u, e, t, r, i);
                }
              })(t, e, i, n, o);
        }
      }
      function Ka(e, t, n) {
        return e.createElement(t, n);
      }
      function Pf(e, t) {
        const n = e[Wn],
          r = n.indexOf(t),
          o = t[ue];
        512 & t[j] && ((t[j] &= -513), Da(o, -1)), n.splice(r, 1);
      }
      function Xa(e, t) {
        if (e.length <= Le) return;
        const n = Le + t,
          r = e[n];
        if (r) {
          const o = r[Wr];
          null !== o && o !== e && Pf(o, r), t > 0 && (e[n - 1][ht] = r[ht]);
          const i = Si(e, Le + t);
          !(function GC(e, t) {
            ao(e, t, t[V], 2, null, null), (t[Bt] = null), (t[Re] = null);
          })(r[E], r);
          const s = i[Mt];
          null !== s && s.detachView(i[E]),
            (r[ue] = null),
            (r[ht] = null),
            (r[j] &= -65);
        }
        return r;
      }
      function Of(e, t) {
        if (!(128 & t[j])) {
          const n = t[V];
          n.destroyNode && ao(e, t, n, 3, null, null),
            (function ZC(e) {
              let t = e[Gr];
              if (!t) return Ja(e[E], e);
              for (; t; ) {
                let n = null;
                if (Ye(t)) n = t[Gr];
                else {
                  const r = t[Le];
                  r && (n = r);
                }
                if (!n) {
                  for (; t && !t[ht] && t !== e; )
                    Ye(t) && Ja(t[E], t), (t = t[ue]);
                  null === t && (t = e), Ye(t) && Ja(t[E], t), (n = t && t[ht]);
                }
                t = n;
              }
            })(t);
        }
      }
      function Ja(e, t) {
        if (!(128 & t[j])) {
          (t[j] &= -65),
            (t[j] |= 128),
            (function XC(e, t) {
              let n;
              if (null != e && null != (n = e.destroyHooks))
                for (let r = 0; r < n.length; r += 2) {
                  const o = t[n[r]];
                  if (!(o instanceof Yr)) {
                    const i = n[r + 1];
                    if (Array.isArray(i))
                      for (let s = 0; s < i.length; s += 2) {
                        const a = o[i[s]],
                          u = i[s + 1];
                        st(4, a, u);
                        try {
                          u.call(a);
                        } finally {
                          st(5, a, u);
                        }
                      }
                    else {
                      st(4, o, i);
                      try {
                        i.call(o);
                      } finally {
                        st(5, o, i);
                      }
                    }
                  }
                }
            })(e, t),
            (function KC(e, t) {
              const n = e.cleanup,
                r = t[Hn];
              let o = -1;
              if (null !== n)
                for (let i = 0; i < n.length - 1; i += 2)
                  if ("string" == typeof n[i]) {
                    const s = n[i + 3];
                    s >= 0 ? r[(o = s)]() : r[(o = -s)].unsubscribe(), (i += 2);
                  } else {
                    const s = r[(o = n[i + 1])];
                    n[i].call(s);
                  }
              if (null !== r) {
                for (let i = o + 1; i < r.length; i++) (0, r[i])();
                t[Hn] = null;
              }
            })(e, t),
            1 === t[E].type && t[V].destroy();
          const n = t[Wr];
          if (null !== n && pt(t[ue])) {
            n !== t[ue] && Pf(n, t);
            const r = t[Mt];
            null !== r && r.detachView(e);
          }
          !(function OC(e) {
            Ha.delete(e[qr]);
          })(t);
        }
      }
      function Ff(e, t, n) {
        return (function Lf(e, t, n) {
          let r = t;
          for (; null !== r && 40 & r.type; ) r = (t = r).parent;
          if (null === r) return n[Bt];
          {
            const { componentOffset: o } = r;
            if (o > -1) {
              const { encapsulation: i } = e.data[r.directiveStart + o];
              if (i === bt.None || i === bt.Emulated) return null;
            }
            return Ke(r, n);
          }
        })(e, t.parent, n);
      }
      function Tn(e, t, n, r, o) {
        e.insertBefore(t, n, r, o);
      }
      function kf(e, t, n) {
        e.appendChild(t, n);
      }
      function jf(e, t, n, r, o) {
        null !== r ? Tn(e, t, n, r, o) : kf(e, t, n);
      }
      function Ai(e, t) {
        return e.parentNode(t);
      }
      let eu,
        iu,
        Uf = function Vf(e, t, n) {
          return 40 & e.type ? Ke(e, n) : null;
        };
      function Ri(e, t, n, r) {
        const o = Ff(e, r, t),
          i = t[V],
          a = (function $f(e, t, n) {
            return Uf(e, t, n);
          })(r.parent || t[Re], r, t);
        if (null != o)
          if (Array.isArray(n))
            for (let u = 0; u < n.length; u++) jf(i, o, n[u], a, !1);
          else jf(i, o, n, a, !1);
        void 0 !== eu && eu(i, r, t, n, o);
      }
      function xi(e, t) {
        if (null !== t) {
          const n = t.type;
          if (3 & n) return Ke(t, e);
          if (4 & n) return tu(-1, e[t.index]);
          if (8 & n) {
            const r = t.child;
            if (null !== r) return xi(e, r);
            {
              const o = e[t.index];
              return pt(o) ? tu(-1, o) : be(o);
            }
          }
          if (32 & n) return qa(t, e)() || be(e[t.index]);
          {
            const r = Hf(e, t);
            return null !== r
              ? Array.isArray(r)
                ? r[0]
                : xi(so(e[xe]), r)
              : xi(e, t.next);
          }
        }
        return null;
      }
      function Hf(e, t) {
        return null !== t ? e[xe][Re].projection[t.projection] : null;
      }
      function tu(e, t) {
        const n = Le + e + 1;
        if (n < t.length) {
          const r = t[n],
            o = r[E].firstChild;
          if (null !== o) return xi(r, o);
        }
        return t[di];
      }
      function ru(e, t, n, r, o, i, s) {
        for (; null != n; ) {
          const a = r[n.index],
            u = n.type;
          if (
            (s && 0 === t && (a && Ne(be(a), r), (n.flags |= 2)),
            32 != (32 & n.flags))
          )
            if (8 & u) ru(e, t, n.child, r, o, i, !1), rr(t, e, o, a, i);
            else if (32 & u) {
              const l = qa(n, r);
              let c;
              for (; (c = l()); ) rr(t, e, o, c, i);
              rr(t, e, o, a, i);
            } else 16 & u ? zf(e, t, r, n, o, i) : rr(t, e, o, a, i);
          n = s ? n.projectionNext : n.next;
        }
      }
      function ao(e, t, n, r, o, i) {
        ru(n, r, e.firstChild, t, o, i, !1);
      }
      function zf(e, t, n, r, o, i) {
        const s = n[xe],
          u = s[Re].projection[r.projection];
        if (Array.isArray(u))
          for (let l = 0; l < u.length; l++) rr(t, e, o, u[l], i);
        else ru(e, t, u, s[ue], o, i, !0);
      }
      function Gf(e, t, n) {
        "" === n
          ? e.removeAttribute(t, "class")
          : e.setAttribute(t, "class", n);
      }
      function Wf(e, t, n) {
        const { mergedAttrs: r, classes: o, styles: i } = n;
        null !== r && Aa(e, t, r),
          null !== o && Gf(e, t, o),
          null !== i &&
            (function o_(e, t, n) {
              e.setAttribute(t, "style", n);
            })(e, t, i);
      }
      const Fi = new A("ENVIRONMENT_INITIALIZER"),
        ah = new A("INJECTOR", -1),
        uh = new A("INJECTOR_DEF_TYPES");
      class lh {
        get(t, n = Vr) {
          if (n === Vr) {
            const r = new Error(`NullInjectorError: No provider for ${ne(t)}!`);
            throw ((r.name = "NullInjectorError"), r);
          }
          return n;
        }
      }
      function x_(...e) {
        return { ɵproviders: ch(0, e), ɵfromNgModule: !0 };
      }
      function ch(e, ...t) {
        const n = [],
          r = new Set();
        let o;
        return (
          Mn(t, (i) => {
            const s = i;
            du(s, n, [], r) && (o || (o = []), o.push(s));
          }),
          void 0 !== o && dh(o, n),
          n
        );
      }
      function dh(e, t) {
        for (let n = 0; n < e.length; n++) {
          const { providers: o } = e[n];
          fu(o, (i) => {
            t.push(i);
          });
        }
      }
      function du(e, t, n, r) {
        if (!(e = b(e))) return !1;
        let o = null,
          i = fd(e);
        const s = !i && K(e);
        if (i || s) {
          if (s && !s.standalone) return !1;
          o = e;
        } else {
          const u = e.ngModule;
          if (((i = fd(u)), !i)) return !1;
          o = u;
        }
        const a = r.has(o);
        if (s) {
          if (a) return !1;
          if ((r.add(o), s.dependencies)) {
            const u =
              "function" == typeof s.dependencies
                ? s.dependencies()
                : s.dependencies;
            for (const l of u) du(l, t, n, r);
          }
        } else {
          if (!i) return !1;
          {
            if (null != i.imports && !a) {
              let l;
              r.add(o);
              try {
                Mn(i.imports, (c) => {
                  du(c, t, n, r) && (l || (l = []), l.push(c));
                });
              } finally {
              }
              void 0 !== l && dh(l, t);
            }
            if (!a) {
              const l = En(o) || (() => new o());
              t.push(
                { provide: o, useFactory: l, deps: Z },
                { provide: uh, useValue: o, multi: !0 },
                { provide: Fi, useValue: () => T(o), multi: !0 }
              );
            }
            const u = i.providers;
            null == u ||
              a ||
              fu(u, (c) => {
                t.push(c);
              });
          }
        }
        return o !== e && void 0 !== e.providers;
      }
      function fu(e, t) {
        for (let n of e)
          ua(n) && (n = n.ɵproviders), Array.isArray(n) ? fu(n, t) : t(n);
      }
      const N_ = J({ provide: String, useValue: J });
      function hu(e) {
        return null !== e && "object" == typeof e && N_ in e;
      }
      function An(e) {
        return "function" == typeof e;
      }
      const pu = new A("Set Injector scope."),
        Li = {},
        O_ = {};
      let gu;
      function ki() {
        return void 0 === gu && (gu = new lh()), gu;
      }
      class Wt {}
      class ph extends Wt {
        get destroyed() {
          return this._destroyed;
        }
        constructor(t, n, r, o) {
          super(),
            (this.parent = n),
            (this.source = r),
            (this.scopes = o),
            (this.records = new Map()),
            (this._ngOnDestroyHooks = new Set()),
            (this._onDestroyHooks = []),
            (this._destroyed = !1),
            yu(t, (s) => this.processProvider(s)),
            this.records.set(ah, ir(void 0, this)),
            o.has("environment") && this.records.set(Wt, ir(void 0, this));
          const i = this.records.get(pu);
          null != i && "string" == typeof i.value && this.scopes.add(i.value),
            (this.injectorDefTypes = new Set(this.get(uh.multi, Z, M.Self)));
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          try {
            for (const t of this._ngOnDestroyHooks) t.ngOnDestroy();
            for (const t of this._onDestroyHooks) t();
          } finally {
            this.records.clear(),
              this._ngOnDestroyHooks.clear(),
              this.injectorDefTypes.clear(),
              (this._onDestroyHooks.length = 0);
          }
        }
        onDestroy(t) {
          this._onDestroyHooks.push(t);
        }
        runInContext(t) {
          this.assertNotDestroyed();
          const n = Un(this),
            r = it(void 0);
          try {
            return t();
          } finally {
            Un(n), it(r);
          }
        }
        get(t, n = Vr, r = M.Default) {
          this.assertNotDestroyed(), (r = si(r));
          const o = Un(this),
            i = it(void 0);
          try {
            if (!(r & M.SkipSelf)) {
              let a = this.records.get(t);
              if (void 0 === a) {
                const u =
                  (function $_(e) {
                    return (
                      "function" == typeof e ||
                      ("object" == typeof e && e instanceof A)
                    );
                  })(t) && ri(t);
                (a = u && this.injectableDefInScope(u) ? ir(mu(t), Li) : null),
                  this.records.set(t, a);
              }
              if (null != a) return this.hydrate(t, a);
            }
            return (r & M.Self ? ki() : this.parent).get(
              t,
              (n = r & M.Optional && n === Vr ? null : n)
            );
          } catch (s) {
            if ("NullInjectorError" === s.name) {
              if (((s[ii] = s[ii] || []).unshift(ne(t)), o)) throw s;
              return (function lw(e, t, n, r) {
                const o = e[ii];
                throw (
                  (t[gd] && o.unshift(t[gd]),
                  (e.message = (function cw(e, t, n, r = null) {
                    e =
                      e && "\n" === e.charAt(0) && e.charAt(1) == sw
                        ? e.slice(2)
                        : e;
                    let o = ne(t);
                    if (Array.isArray(t)) o = t.map(ne).join(" -> ");
                    else if ("object" == typeof t) {
                      let i = [];
                      for (let s in t)
                        if (t.hasOwnProperty(s)) {
                          let a = t[s];
                          i.push(
                            s +
                              ":" +
                              ("string" == typeof a ? JSON.stringify(a) : ne(a))
                          );
                        }
                      o = `{${i.join(", ")}}`;
                    }
                    return `${n}${r ? "(" + r + ")" : ""}[${o}]: ${e.replace(
                      iw,
                      "\n  "
                    )}`;
                  })("\n" + e.message, o, n, r)),
                  (e[ow] = o),
                  (e[ii] = null),
                  e)
                );
              })(s, t, "R3InjectorError", this.source);
            }
            throw s;
          } finally {
            it(i), Un(o);
          }
        }
        resolveInjectorInitializers() {
          const t = Un(this),
            n = it(void 0);
          try {
            const r = this.get(Fi.multi, Z, M.Self);
            for (const o of r) o();
          } finally {
            Un(t), it(n);
          }
        }
        toString() {
          const t = [],
            n = this.records;
          for (const r of n.keys()) t.push(ne(r));
          return `R3Injector[${t.join(", ")}]`;
        }
        assertNotDestroyed() {
          if (this._destroyed) throw new w(205, !1);
        }
        processProvider(t) {
          let n = An((t = b(t))) ? t : b(t && t.provide);
          const r = (function L_(e) {
            return hu(e)
              ? ir(void 0, e.useValue)
              : ir(
                  (function gh(e, t, n) {
                    let r;
                    if (An(e)) {
                      const o = b(e);
                      return En(o) || mu(o);
                    }
                    if (hu(e)) r = () => b(e.useValue);
                    else if (
                      (function hh(e) {
                        return !(!e || !e.useFactory);
                      })(e)
                    )
                      r = () => e.useFactory(...fa(e.deps || []));
                    else if (
                      (function fh(e) {
                        return !(!e || !e.useExisting);
                      })(e)
                    )
                      r = () => T(b(e.useExisting));
                    else {
                      const o = b(e && (e.useClass || e.provide));
                      if (
                        !(function k_(e) {
                          return !!e.deps;
                        })(e)
                      )
                        return En(o) || mu(o);
                      r = () => new o(...fa(e.deps));
                    }
                    return r;
                  })(e),
                  Li
                );
          })(t);
          if (An(t) || !0 !== t.multi) this.records.get(n);
          else {
            let o = this.records.get(n);
            o ||
              ((o = ir(void 0, Li, !0)),
              (o.factory = () => fa(o.multi)),
              this.records.set(n, o)),
              (n = t),
              o.multi.push(t);
          }
          this.records.set(n, r);
        }
        hydrate(t, n) {
          return (
            n.value === Li && ((n.value = O_), (n.value = n.factory())),
            "object" == typeof n.value &&
              n.value &&
              (function j_(e) {
                return (
                  null !== e &&
                  "object" == typeof e &&
                  "function" == typeof e.ngOnDestroy
                );
              })(n.value) &&
              this._ngOnDestroyHooks.add(n.value),
            n.value
          );
        }
        injectableDefInScope(t) {
          if (!t.providedIn) return !1;
          const n = b(t.providedIn);
          return "string" == typeof n
            ? "any" === n || this.scopes.has(n)
            : this.injectorDefTypes.has(n);
        }
      }
      function mu(e) {
        const t = ri(e),
          n = null !== t ? t.factory : En(e);
        if (null !== n) return n;
        if (e instanceof A) throw new w(204, !1);
        if (e instanceof Function)
          return (function F_(e) {
            const t = e.length;
            if (t > 0)
              throw (
                ((function eo(e, t) {
                  const n = [];
                  for (let r = 0; r < e; r++) n.push(t);
                  return n;
                })(t, "?"),
                new w(204, !1))
              );
            const n = (function ew(e) {
              const t = e && (e[oi] || e[hd]);
              return t
                ? ((function tw(e) {
                    if (e.hasOwnProperty("name")) return e.name;
                    ("" + e).match(/^function\s*([^\s(]+)/);
                  })(e),
                  t)
                : null;
            })(e);
            return null !== n ? () => n.factory(e) : () => new e();
          })(e);
        throw new w(204, !1);
      }
      function ir(e, t, n = !1) {
        return { factory: e, value: t, multi: n ? [] : void 0 };
      }
      function yu(e, t) {
        for (const n of e)
          Array.isArray(n) ? yu(n, t) : n && ua(n) ? yu(n.ɵproviders, t) : t(n);
      }
      class V_ {}
      class mh {}
      class B_ {
        resolveComponentFactory(t) {
          throw (function U_(e) {
            const t = Error(
              `No component factory found for ${ne(
                e
              )}. Did you add it to @NgModule.entryComponents?`
            );
            return (t.ngComponent = e), t;
          })(t);
        }
      }
      let fo = (() => {
        class e {}
        return (e.NULL = new B_()), e;
      })();
      function H_() {
        return sr(Me(), v());
      }
      function sr(e, t) {
        return new an(Ke(e, t));
      }
      let an = (() => {
        class e {
          constructor(n) {
            this.nativeElement = n;
          }
        }
        return (e.__NG_ELEMENT_ID__ = H_), e;
      })();
      class vh {}
      let W_ = (() => {
        class e {}
        return (
          (e.ɵprov = P({ token: e, providedIn: "root", factory: () => null })),
          e
        );
      })();
      class $i {
        constructor(t) {
          (this.full = t),
            (this.major = t.split(".")[0]),
            (this.minor = t.split(".")[1]),
            (this.patch = t.split(".").slice(2).join("."));
        }
      }
      const q_ = new $i("15.2.5"),
        vu = {},
        Du = "ngOriginalError";
      function wu(e) {
        return e[Du];
      }
      class ar {
        constructor() {
          this._console = console;
        }
        handleError(t) {
          const n = this._findOriginalError(t);
          this._console.error("ERROR", t),
            n && this._console.error("ORIGINAL ERROR", n);
        }
        _findOriginalError(t) {
          let n = t && wu(t);
          for (; n && wu(n); ) n = wu(n);
          return n || null;
        }
      }
      function qt(e) {
        return e instanceof Function ? e() : e;
      }
      function wh(e, t, n) {
        let r = e.length;
        for (;;) {
          const o = e.indexOf(t, n);
          if (-1 === o) return o;
          if (0 === o || e.charCodeAt(o - 1) <= 32) {
            const i = t.length;
            if (o + i === r || e.charCodeAt(o + i) <= 32) return o;
          }
          n = o + 1;
        }
      }
      const Ch = "ng-template";
      function oE(e, t, n) {
        let r = 0,
          o = !0;
        for (; r < e.length; ) {
          let i = e[r++];
          if ("string" == typeof i && o) {
            const s = e[r++];
            if (n && "class" === i && -1 !== wh(s.toLowerCase(), t, 0))
              return !0;
          } else {
            if (1 === i) {
              for (; r < e.length && "string" == typeof (i = e[r++]); )
                if (i.toLowerCase() === t) return !0;
              return !1;
            }
            "number" == typeof i && (o = !1);
          }
        }
        return !1;
      }
      function _h(e) {
        return 4 === e.type && e.value !== Ch;
      }
      function iE(e, t, n) {
        return t === (4 !== e.type || n ? e.value : Ch);
      }
      function sE(e, t, n) {
        let r = 4;
        const o = e.attrs || [],
          i = (function lE(e) {
            for (let t = 0; t < e.length; t++) if (Wd(e[t])) return t;
            return e.length;
          })(o);
        let s = !1;
        for (let a = 0; a < t.length; a++) {
          const u = t[a];
          if ("number" != typeof u) {
            if (!s)
              if (4 & r) {
                if (
                  ((r = 2 | (1 & r)),
                  ("" !== u && !iE(e, u, n)) || ("" === u && 1 === t.length))
                ) {
                  if (mt(r)) return !1;
                  s = !0;
                }
              } else {
                const l = 8 & r ? u : t[++a];
                if (8 & r && null !== e.attrs) {
                  if (!oE(e.attrs, l, n)) {
                    if (mt(r)) return !1;
                    s = !0;
                  }
                  continue;
                }
                const d = aE(8 & r ? "class" : u, o, _h(e), n);
                if (-1 === d) {
                  if (mt(r)) return !1;
                  s = !0;
                  continue;
                }
                if ("" !== l) {
                  let f;
                  f = d > i ? "" : o[d + 1].toLowerCase();
                  const h = 8 & r ? f : null;
                  if ((h && -1 !== wh(h, l, 0)) || (2 & r && l !== f)) {
                    if (mt(r)) return !1;
                    s = !0;
                  }
                }
              }
          } else {
            if (!s && !mt(r) && !mt(u)) return !1;
            if (s && mt(u)) continue;
            (s = !1), (r = u | (1 & r));
          }
        }
        return mt(r) || s;
      }
      function mt(e) {
        return 0 == (1 & e);
      }
      function aE(e, t, n, r) {
        if (null === t) return -1;
        let o = 0;
        if (r || !n) {
          let i = !1;
          for (; o < t.length; ) {
            const s = t[o];
            if (s === e) return o;
            if (3 === s || 6 === s) i = !0;
            else {
              if (1 === s || 2 === s) {
                let a = t[++o];
                for (; "string" == typeof a; ) a = t[++o];
                continue;
              }
              if (4 === s) break;
              if (0 === s) {
                o += 4;
                continue;
              }
            }
            o += i ? 1 : 2;
          }
          return -1;
        }
        return (function cE(e, t) {
          let n = e.indexOf(4);
          if (n > -1)
            for (n++; n < e.length; ) {
              const r = e[n];
              if ("number" == typeof r) return -1;
              if (r === t) return n;
              n++;
            }
          return -1;
        })(t, e);
      }
      function Eh(e, t, n = !1) {
        for (let r = 0; r < t.length; r++) if (sE(e, t[r], n)) return !0;
        return !1;
      }
      function Ih(e, t) {
        return e ? ":not(" + t.trim() + ")" : t;
      }
      function fE(e) {
        let t = e[0],
          n = 1,
          r = 2,
          o = "",
          i = !1;
        for (; n < e.length; ) {
          let s = e[n];
          if ("string" == typeof s)
            if (2 & r) {
              const a = e[++n];
              o += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]";
            } else 8 & r ? (o += "." + s) : 4 & r && (o += " " + s);
          else
            "" !== o && !mt(s) && ((t += Ih(i, o)), (o = "")),
              (r = s),
              (i = i || !mt(r));
          n++;
        }
        return "" !== o && (t += Ih(i, o)), t;
      }
      const L = {};
      function Ah(e, t = null, n = null, r) {
        const o = Rh(e, t, n, r);
        return o.resolveInjectorInitializers(), o;
      }
      function Rh(e, t = null, n = null, r, o = new Set()) {
        const i = [n || Z, x_(e)];
        return (
          (r = r || ("object" == typeof e ? void 0 : ne(e))),
          new ph(i, t || ki(), r || null, o)
        );
      }
      let Zt = (() => {
        class e {
          static create(n, r) {
            if (Array.isArray(n)) return Ah({ name: "" }, r, n, "");
            {
              const o = n.name ?? "";
              return Ah({ name: o }, n.parent, n.providers, o);
            }
          }
        }
        return (
          (e.THROW_IF_NOT_FOUND = Vr),
          (e.NULL = new lh()),
          (e.ɵprov = P({ token: e, providedIn: "any", factory: () => T(ah) })),
          (e.__NG_ELEMENT_ID__ = -1),
          e
        );
      })();
      function R(e, t = M.Default) {
        const n = v();
        return null === n ? T(e, t) : tf(Me(), n, b(e), t);
      }
      function jh(e, t) {
        const n = e.contentQueries;
        if (null !== n)
          for (let r = 0; r < n.length; r += 2) {
            const i = n[r + 1];
            if (-1 !== i) {
              const s = e.data[i];
              Ia(n[r]), s.contentQueries(2, t[i], i);
            }
          }
      }
      function Ui(e, t, n, r, o, i, s, a, u, l, c) {
        const d = t.blueprint.slice();
        return (
          (d[Bt] = o),
          (d[j] = 76 | r),
          (null !== c || (e && 1024 & e[j])) && (d[j] |= 1024),
          Nd(d),
          (d[ue] = d[zn] = e),
          (d[ce] = n),
          (d[ci] = s || (e && e[ci])),
          (d[V] = a || (e && e[V])),
          (d[ga] = u || (e && e[ga]) || null),
          (d[li] = l || (e && e[li]) || null),
          (d[Re] = i),
          (d[qr] = (function NC() {
            return xC++;
          })()),
          (d[_d] = c),
          (d[xe] = 2 == t.type ? e[xe] : d),
          d
        );
      }
      function cr(e, t, n, r, o) {
        let i = e.data[t];
        if (null === i)
          (i = (function Su(e, t, n, r, o) {
            const i = Fd(),
              s = wa(),
              u = (e.data[t] = (function $E(e, t, n, r, o, i) {
                return {
                  type: n,
                  index: r,
                  insertBeforeIndex: null,
                  injectorIndex: t ? t.injectorIndex : -1,
                  directiveStart: -1,
                  directiveEnd: -1,
                  directiveStylingLast: -1,
                  componentOffset: -1,
                  propertyBindings: null,
                  flags: 0,
                  providerIndexes: 0,
                  value: o,
                  attrs: i,
                  mergedAttrs: null,
                  localNames: null,
                  initialInputs: void 0,
                  inputs: null,
                  outputs: null,
                  tView: null,
                  next: null,
                  prev: null,
                  projectionNext: null,
                  child: null,
                  parent: t,
                  projection: null,
                  styles: null,
                  stylesWithoutHost: null,
                  residualStyles: void 0,
                  classes: null,
                  classesWithoutHost: null,
                  residualClasses: void 0,
                  classBindings: 0,
                  styleBindings: 0,
                };
              })(0, s ? i : i && i.parent, n, t, r, o));
            return (
              null === e.firstChild && (e.firstChild = u),
              null !== i &&
                (s
                  ? null == i.child && null !== u.parent && (i.child = u)
                  : null === i.next && ((i.next = u), (u.prev = i))),
              u
            );
          })(e, t, n, r, o)),
            (function Lw() {
              return F.lFrame.inI18n;
            })() && (i.flags |= 32);
        else if (64 & i.type) {
          (i.type = n), (i.value = r), (i.attrs = o);
          const s = (function Qr() {
            const e = F.lFrame,
              t = e.currentTNode;
            return e.isParent ? t : t.parent;
          })();
          i.injectorIndex = null === s ? -1 : s.injectorIndex;
        }
        return Tt(i, !0), i;
      }
      function ho(e, t, n, r) {
        if (0 === n) return -1;
        const o = t.length;
        for (let i = 0; i < n; i++)
          t.push(r), e.blueprint.push(r), e.data.push(null);
        return o;
      }
      function bu(e, t, n) {
        Sa(t);
        try {
          const r = e.viewQuery;
          null !== r && Lu(1, r, n);
          const o = e.template;
          null !== o && $h(e, t, o, 1, n),
            e.firstCreatePass && (e.firstCreatePass = !1),
            e.staticContentQueries && jh(e, t),
            e.staticViewQueries && Lu(2, e.viewQuery, n);
          const i = e.components;
          null !== i &&
            (function LE(e, t) {
              for (let n = 0; n < t.length; n++) o0(e, t[n]);
            })(t, i);
        } catch (r) {
          throw (
            (e.firstCreatePass &&
              ((e.incompleteFirstPass = !0), (e.firstCreatePass = !1)),
            r)
          );
        } finally {
          (t[j] &= -5), ba();
        }
      }
      function Bi(e, t, n, r) {
        const o = t[j];
        if (128 != (128 & o)) {
          Sa(t);
          try {
            Nd(t),
              (function kd(e) {
                return (F.lFrame.bindingIndex = e);
              })(e.bindingStartIndex),
              null !== n && $h(e, t, n, 2, r);
            const s = 3 == (3 & o);
            if (s) {
              const l = e.preOrderCheckHooks;
              null !== l && yi(t, l, null);
            } else {
              const l = e.preOrderHooks;
              null !== l && vi(t, l, 0, null), Ma(t, 0);
            }
            if (
              ((function n0(e) {
                for (let t = Za(e); null !== t; t = Qa(t)) {
                  if (!t[Ed]) continue;
                  const n = t[Wn];
                  for (let r = 0; r < n.length; r++) {
                    const o = n[r];
                    512 & o[j] || Da(o[ue], 1), (o[j] |= 512);
                  }
                }
              })(t),
              (function t0(e) {
                for (let t = Za(e); null !== t; t = Qa(t))
                  for (let n = Le; n < t.length; n++) {
                    const r = t[n],
                      o = r[E];
                    gi(r) && Bi(o, r, o.template, r[ce]);
                  }
              })(t),
              null !== e.contentQueries && jh(e, t),
              s)
            ) {
              const l = e.contentCheckHooks;
              null !== l && yi(t, l);
            } else {
              const l = e.contentHooks;
              null !== l && vi(t, l, 1), Ma(t, 1);
            }
            !(function OE(e, t) {
              const n = e.hostBindingOpCodes;
              if (null !== n)
                try {
                  for (let r = 0; r < n.length; r++) {
                    const o = n[r];
                    if (o < 0) Sn(~o);
                    else {
                      const i = o,
                        s = n[++r],
                        a = n[++r];
                      kw(s, i), a(2, t[i]);
                    }
                  }
                } finally {
                  Sn(-1);
                }
            })(e, t);
            const a = e.components;
            null !== a &&
              (function FE(e, t) {
                for (let n = 0; n < t.length; n++) r0(e, t[n]);
              })(t, a);
            const u = e.viewQuery;
            if ((null !== u && Lu(2, u, r), s)) {
              const l = e.viewCheckHooks;
              null !== l && yi(t, l);
            } else {
              const l = e.viewHooks;
              null !== l && vi(t, l, 2), Ma(t, 2);
            }
            !0 === e.firstUpdatePass && (e.firstUpdatePass = !1),
              (t[j] &= -41),
              512 & t[j] && ((t[j] &= -513), Da(t[ue], -1));
          } finally {
            ba();
          }
        }
      }
      function $h(e, t, n, r, o) {
        const i = (function je() {
            return F.lFrame.selectedIndex;
          })(),
          s = 2 & r;
        try {
          Sn(-1),
            s &&
              t.length > ie &&
              (function Sh(e, t, n, r) {
                if (!r)
                  if (3 == (3 & t[j])) {
                    const i = e.preOrderCheckHooks;
                    null !== i && yi(t, i, n);
                  } else {
                    const i = e.preOrderHooks;
                    null !== i && vi(t, i, 0, n);
                  }
                Sn(n);
              })(e, t, ie, !1),
            st(s ? 2 : 0, o),
            n(r, o);
        } finally {
          Sn(i), st(s ? 3 : 1, o);
        }
      }
      function Mu(e, t, n) {
        if (ya(t)) {
          const o = t.directiveEnd;
          for (let i = t.directiveStart; i < o; i++) {
            const s = e.data[i];
            s.contentQueries && s.contentQueries(1, n[i], i);
          }
        }
      }
      function Vh(e) {
        const t = e.tView;
        return null === t || t.incompleteFirstPass
          ? (e.tView = Ru(
              1,
              null,
              e.template,
              e.decls,
              e.vars,
              e.directiveDefs,
              e.pipeDefs,
              e.viewQuery,
              e.schemas,
              e.consts
            ))
          : t;
      }
      function Ru(e, t, n, r, o, i, s, a, u, l) {
        const c = ie + r,
          d = c + o,
          f = (function kE(e, t) {
            const n = [];
            for (let r = 0; r < t; r++) n.push(r < e ? null : L);
            return n;
          })(c, d),
          h = "function" == typeof l ? l() : l;
        return (f[E] = {
          type: e,
          blueprint: f,
          template: n,
          queries: null,
          viewQuery: a,
          declTNode: t,
          data: f.slice().fill(null, c),
          bindingStartIndex: c,
          expandoStartIndex: d,
          hostBindingOpCodes: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: "function" == typeof i ? i() : i,
          pipeRegistry: "function" == typeof s ? s() : s,
          firstChild: null,
          schemas: u,
          consts: h,
          incompleteFirstPass: !1,
        });
      }
      function Uh(e, t, n, r) {
        const o = (function Zh(e) {
          return e[Hn] || (e[Hn] = []);
        })(t);
        null === n
          ? o.push(r)
          : (o.push(n),
            e.firstCreatePass &&
              (function Qh(e) {
                return e.cleanup || (e.cleanup = []);
              })(e).push(r, o.length - 1));
      }
      function Bh(e, t, n, r) {
        for (let o in e)
          if (e.hasOwnProperty(o)) {
            n = null === n ? {} : n;
            const i = e[o];
            null === r
              ? Hh(n, t, o, i)
              : r.hasOwnProperty(o) && Hh(n, t, r[o], i);
          }
        return n;
      }
      function Hh(e, t, n, r) {
        e.hasOwnProperty(n) ? e[n].push(t, r) : (e[n] = [t, r]);
      }
      function Gh(e, t, n, r, o, i) {
        for (let l = 0; l < r.length; l++) Pa(_i(n, t), e, r[l].type);
        !(function YE(e, t, n) {
          (e.flags |= 1),
            (e.directiveStart = t),
            (e.directiveEnd = t + n),
            (e.providerIndexes = t);
        })(n, e.data.length, r.length);
        for (let l = 0; l < r.length; l++) {
          const c = r[l];
          c.providersResolver && c.providersResolver(c);
        }
        let s = !1,
          a = !1,
          u = ho(e, t, r.length, null);
        for (let l = 0; l < r.length; l++) {
          const c = r[l];
          (n.mergedAttrs = Kr(n.mergedAttrs, c.hostAttrs)),
            KE(e, n, t, u, c),
            QE(u, c, o),
            null !== c.contentQueries && (n.flags |= 4),
            (null !== c.hostBindings ||
              null !== c.hostAttrs ||
              0 !== c.hostVars) &&
              (n.flags |= 64);
          const d = c.type.prototype;
          !s &&
            (d.ngOnChanges || d.ngOnInit || d.ngDoCheck) &&
            ((e.preOrderHooks || (e.preOrderHooks = [])).push(n.index),
            (s = !0)),
            !a &&
              (d.ngOnChanges || d.ngDoCheck) &&
              ((e.preOrderCheckHooks || (e.preOrderCheckHooks = [])).push(
                n.index
              ),
              (a = !0)),
            u++;
        }
        !(function VE(e, t, n) {
          const o = t.directiveEnd,
            i = e.data,
            s = t.attrs,
            a = [];
          let u = null,
            l = null;
          for (let c = t.directiveStart; c < o; c++) {
            const d = i[c],
              f = n ? n.get(d) : null,
              p = f ? f.outputs : null;
            (u = Bh(d.inputs, c, u, f ? f.inputs : null)),
              (l = Bh(d.outputs, c, l, p));
            const g = null === u || null === s || _h(t) ? null : e0(u, c, s);
            a.push(g);
          }
          null !== u &&
            (u.hasOwnProperty("class") && (t.flags |= 8),
            u.hasOwnProperty("style") && (t.flags |= 16)),
            (t.initialInputs = a),
            (t.inputs = u),
            (t.outputs = l);
        })(e, n, i);
      }
      function Wh(e, t, n) {
        const r = n.directiveStart,
          o = n.directiveEnd,
          i = n.index,
          s = (function jw() {
            return F.lFrame.currentDirectiveIndex;
          })();
        try {
          Sn(i);
          for (let a = r; a < o; a++) {
            const u = e.data[a],
              l = t[a];
            _a(a),
              (null !== u.hostBindings ||
                0 !== u.hostVars ||
                null !== u.hostAttrs) &&
                WE(u, l);
          }
        } finally {
          Sn(-1), _a(s);
        }
      }
      function WE(e, t) {
        null !== e.hostBindings && e.hostBindings(1, t);
      }
      function Nu(e, t, n) {
        (t.componentOffset = n),
          (e.components || (e.components = [])).push(t.index);
      }
      function QE(e, t, n) {
        if (n) {
          if (t.exportAs)
            for (let r = 0; r < t.exportAs.length; r++) n[t.exportAs[r]] = e;
          gt(t) && (n[""] = e);
        }
      }
      function KE(e, t, n, r, o) {
        e.data[r] = o;
        const i = o.factory || (o.factory = En(o.type)),
          s = new Yr(i, gt(o), R);
        (e.blueprint[r] = s),
          (n[r] = s),
          (function HE(e, t, n, r, o) {
            const i = o.hostBindings;
            if (i) {
              let s = e.hostBindingOpCodes;
              null === s && (s = e.hostBindingOpCodes = []);
              const a = ~t.index;
              (function zE(e) {
                let t = e.length;
                for (; t > 0; ) {
                  const n = e[--t];
                  if ("number" == typeof n && n < 0) return n;
                }
                return 0;
              })(s) != a && s.push(a),
                s.push(n, r, i);
            }
          })(e, t, r, ho(e, n, o.hostVars, L), o);
      }
      function JE(e, t, n, r, o, i) {
        const s = i[t];
        if (null !== s) {
          const a = r.setInput;
          for (let u = 0; u < s.length; ) {
            const l = s[u++],
              c = s[u++],
              d = s[u++];
            null !== a ? r.setInput(n, d, l, c) : (n[c] = d);
          }
        }
      }
      function e0(e, t, n) {
        let r = null,
          o = 0;
        for (; o < n.length; ) {
          const i = n[o];
          if (0 !== i)
            if (5 !== i) {
              if ("number" == typeof i) break;
              if (e.hasOwnProperty(i)) {
                null === r && (r = []);
                const s = e[i];
                for (let a = 0; a < s.length; a += 2)
                  if (s[a] === t) {
                    r.push(i, s[a + 1], n[o + 1]);
                    break;
                  }
              }
              o += 2;
            } else o += 2;
          else o += 4;
        }
        return r;
      }
      function r0(e, t) {
        const n = Xe(t, e);
        if (gi(n)) {
          const r = n[E];
          48 & n[j] ? Bi(r, n, r.template, n[ce]) : n[_n] > 0 && Ou(n);
        }
      }
      function Ou(e) {
        for (let r = Za(e); null !== r; r = Qa(r))
          for (let o = Le; o < r.length; o++) {
            const i = r[o];
            if (gi(i))
              if (512 & i[j]) {
                const s = i[E];
                Bi(s, i, s.template, i[ce]);
              } else i[_n] > 0 && Ou(i);
          }
        const n = e[E].components;
        if (null !== n)
          for (let r = 0; r < n.length; r++) {
            const o = Xe(n[r], e);
            gi(o) && o[_n] > 0 && Ou(o);
          }
      }
      function o0(e, t) {
        const n = Xe(t, e),
          r = n[E];
        (function s0(e, t) {
          for (let n = t.length; n < e.blueprint.length; n++)
            t.push(e.blueprint[n]);
        })(r, n),
          bu(r, n, n[ce]);
      }
      function Hi(e, t) {
        return e[Gr] ? (e[Cd][ht] = t) : (e[Gr] = t), (e[Cd] = t), t;
      }
      function zi(e, t, n, r = !0) {
        const o = t[ci];
        o.begin && o.begin();
        try {
          Bi(e, t, e.template, n);
        } catch (s) {
          throw (
            (r &&
              (function Kh(e, t) {
                const n = e[li],
                  r = n ? n.get(ar, null) : null;
                r && r.handleError(t);
              })(t, s),
            s)
          );
        } finally {
          o.end && o.end();
        }
      }
      function Lu(e, t, n) {
        Ia(0), t(e, n);
      }
      function ku(e, t, n, r, o) {
        for (let i = 0; i < n.length; ) {
          const s = n[i++],
            a = n[i++],
            u = t[s],
            l = e.data[s];
          null !== l.setInput ? l.setInput(u, o, r, a) : (u[a] = o);
        }
      }
      function Gi(e, t, n) {
        let r = n ? e.styles : null,
          o = n ? e.classes : null,
          i = 0;
        if (null !== t)
          for (let s = 0; s < t.length; s++) {
            const a = t[s];
            "number" == typeof a
              ? (i = a)
              : 1 == i
              ? (o = ia(o, a))
              : 2 == i && (r = ia(r, a + ": " + t[++s] + ";"));
          }
        n ? (e.styles = r) : (e.stylesWithoutHost = r),
          n ? (e.classes = o) : (e.classesWithoutHost = o);
      }
      function Wi(e, t, n, r, o = !1) {
        for (; null !== n; ) {
          const i = t[n.index];
          if ((null !== i && r.push(be(i)), pt(i)))
            for (let a = Le; a < i.length; a++) {
              const u = i[a],
                l = u[E].firstChild;
              null !== l && Wi(u[E], u, l, r);
            }
          const s = n.type;
          if (8 & s) Wi(e, t, n.child, r);
          else if (32 & s) {
            const a = qa(n, t);
            let u;
            for (; (u = a()); ) r.push(u);
          } else if (16 & s) {
            const a = Hf(t, n);
            if (Array.isArray(a)) r.push(...a);
            else {
              const u = so(t[xe]);
              Wi(u[E], u, a, r, !0);
            }
          }
          n = o ? n.projectionNext : n.next;
        }
        return r;
      }
      class po {
        get rootNodes() {
          const t = this._lView,
            n = t[E];
          return Wi(n, t, n.firstChild, []);
        }
        constructor(t, n) {
          (this._lView = t),
            (this._cdRefInjectingView = n),
            (this._appRef = null),
            (this._attachedToViewContainer = !1);
        }
        get context() {
          return this._lView[ce];
        }
        set context(t) {
          this._lView[ce] = t;
        }
        get destroyed() {
          return 128 == (128 & this._lView[j]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._attachedToViewContainer) {
            const t = this._lView[ue];
            if (pt(t)) {
              const n = t[fi],
                r = n ? n.indexOf(this) : -1;
              r > -1 && (Xa(t, r), Si(n, r));
            }
            this._attachedToViewContainer = !1;
          }
          Of(this._lView[E], this._lView);
        }
        onDestroy(t) {
          Uh(this._lView[E], this._lView, null, t);
        }
        markForCheck() {
          !(function Fu(e) {
            for (; e; ) {
              e[j] |= 32;
              const t = so(e);
              if (mw(e) && !t) return e;
              e = t;
            }
            return null;
          })(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[j] &= -65;
        }
        reattach() {
          this._lView[j] |= 64;
        }
        detectChanges() {
          zi(this._lView[E], this._lView, this.context);
        }
        checkNoChanges() {}
        attachToViewContainerRef() {
          if (this._appRef) throw new w(902, !1);
          this._attachedToViewContainer = !0;
        }
        detachFromAppRef() {
          (this._appRef = null),
            (function qC(e, t) {
              ao(e, t, t[V], 2, null, null);
            })(this._lView[E], this._lView);
        }
        attachToAppRef(t) {
          if (this._attachedToViewContainer) throw new w(902, !1);
          this._appRef = t;
        }
      }
      class a0 extends po {
        constructor(t) {
          super(t), (this._view = t);
        }
        detectChanges() {
          const t = this._view;
          zi(t[E], t, t[ce], !1);
        }
        checkNoChanges() {}
        get context() {
          return null;
        }
      }
      class Xh extends fo {
        constructor(t) {
          super(), (this.ngModule = t);
        }
        resolveComponentFactory(t) {
          const n = K(t);
          return new go(n, this.ngModule);
        }
      }
      function Jh(e) {
        const t = [];
        for (let n in e)
          e.hasOwnProperty(n) && t.push({ propName: e[n], templateName: n });
        return t;
      }
      class l0 {
        constructor(t, n) {
          (this.injector = t), (this.parentInjector = n);
        }
        get(t, n, r) {
          r = si(r);
          const o = this.injector.get(t, vu, r);
          return o !== vu || n === vu ? o : this.parentInjector.get(t, n, r);
        }
      }
      class go extends mh {
        get inputs() {
          return Jh(this.componentDef.inputs);
        }
        get outputs() {
          return Jh(this.componentDef.outputs);
        }
        constructor(t, n) {
          super(),
            (this.componentDef = t),
            (this.ngModule = n),
            (this.componentType = t.type),
            (this.selector = (function hE(e) {
              return e.map(fE).join(",");
            })(t.selectors)),
            (this.ngContentSelectors = t.ngContentSelectors
              ? t.ngContentSelectors
              : []),
            (this.isBoundToModule = !!n);
        }
        create(t, n, r, o) {
          let i = (o = o || this.ngModule) instanceof Wt ? o : o?.injector;
          i &&
            null !== this.componentDef.getStandaloneInjector &&
            (i = this.componentDef.getStandaloneInjector(i) || i);
          const s = i ? new l0(t, i) : t,
            a = s.get(vh, null);
          if (null === a) throw new w(407, !1);
          const u = s.get(W_, null),
            l = a.createRenderer(null, this.componentDef),
            c = this.componentDef.selectors[0][0] || "div",
            d = r
              ? (function jE(e, t, n) {
                  return e.selectRootElement(t, n === bt.ShadowDom);
                })(l, r, this.componentDef.encapsulation)
              : Ka(
                  l,
                  c,
                  (function u0(e) {
                    const t = e.toLowerCase();
                    return "svg" === t ? "svg" : "math" === t ? "math" : null;
                  })(c)
                ),
            f = this.componentDef.onPush ? 288 : 272,
            h = Ru(0, null, null, 1, 0, null, null, null, null, null),
            p = Ui(null, h, null, f, null, null, a, l, u, s, null);
          let g, m;
          Sa(p);
          try {
            const D = this.componentDef;
            let _,
              y = null;
            D.findHostDirectiveDefs
              ? ((_ = []),
                (y = new Map()),
                D.findHostDirectiveDefs(D, _, y),
                _.push(D))
              : (_ = [D]);
            const N = (function d0(e, t) {
                const n = e[E],
                  r = ie;
                return (e[r] = t), cr(n, r, 2, "#host", null);
              })(p, d),
              ee = (function f0(e, t, n, r, o, i, s, a) {
                const u = o[E];
                !(function h0(e, t, n, r) {
                  for (const o of e)
                    t.mergedAttrs = Kr(t.mergedAttrs, o.hostAttrs);
                  null !== t.mergedAttrs &&
                    (Gi(t, t.mergedAttrs, !0), null !== n && Wf(r, n, t));
                })(r, e, t, s);
                const l = i.createRenderer(t, n),
                  c = Ui(
                    o,
                    Vh(n),
                    null,
                    n.onPush ? 32 : 16,
                    o[e.index],
                    e,
                    i,
                    l,
                    a || null,
                    null,
                    null
                  );
                return (
                  u.firstCreatePass && Nu(u, e, r.length - 1),
                  Hi(o, c),
                  (o[e.index] = c)
                );
              })(N, d, D, _, p, a, l);
            (m = (function xd(e, t) {
              return e.data[t];
            })(h, ie)),
              d &&
                (function g0(e, t, n, r) {
                  if (r) Aa(e, n, ["ng-version", q_.full]);
                  else {
                    const { attrs: o, classes: i } = (function pE(e) {
                      const t = [],
                        n = [];
                      let r = 1,
                        o = 2;
                      for (; r < e.length; ) {
                        let i = e[r];
                        if ("string" == typeof i)
                          2 === o
                            ? "" !== i && t.push(i, e[++r])
                            : 8 === o && n.push(i);
                        else {
                          if (!mt(o)) break;
                          o = i;
                        }
                        r++;
                      }
                      return { attrs: t, classes: n };
                    })(t.selectors[0]);
                    o && Aa(e, n, o),
                      i && i.length > 0 && Gf(e, n, i.join(" "));
                  }
                })(l, D, d, r),
              void 0 !== n &&
                (function m0(e, t, n) {
                  const r = (e.projection = []);
                  for (let o = 0; o < t.length; o++) {
                    const i = n[o];
                    r.push(null != i ? Array.from(i) : null);
                  }
                })(m, this.ngContentSelectors, n),
              (g = (function p0(e, t, n, r, o, i) {
                const s = Me(),
                  a = o[E],
                  u = Ke(s, o);
                Gh(a, o, s, n, null, r);
                for (let c = 0; c < n.length; c++)
                  Ne(bn(o, a, s.directiveStart + c, s), o);
                Wh(a, o, s), u && Ne(u, o);
                const l = bn(o, a, s.directiveStart + s.componentOffset, s);
                if (((e[ce] = o[ce] = l), null !== i))
                  for (const c of i) c(l, t);
                return Mu(a, s, e), l;
              })(ee, D, _, y, p, [y0])),
              bu(h, p, null);
          } finally {
            ba();
          }
          return new c0(this.componentType, g, sr(m, p), p, m);
        }
      }
      class c0 extends V_ {
        constructor(t, n, r, o, i) {
          super(),
            (this.location = r),
            (this._rootLView = o),
            (this._tNode = i),
            (this.instance = n),
            (this.hostView = this.changeDetectorRef = new a0(o)),
            (this.componentType = t);
        }
        setInput(t, n) {
          const r = this._tNode.inputs;
          let o;
          if (null !== r && (o = r[t])) {
            const i = this._rootLView;
            ku(i[E], i, o, t, n),
              (function zh(e, t) {
                const n = Xe(t, e);
                16 & n[j] || (n[j] |= 32);
              })(i, this._tNode.index);
          }
        }
        get injector() {
          return new Yn(this._tNode, this._rootLView);
        }
        destroy() {
          this.hostView.destroy();
        }
        onDestroy(t) {
          this.hostView.onDestroy(t);
        }
      }
      function y0() {
        const e = Me();
        mi(v()[E], e);
      }
      function Uu(e, t, n, r, o) {
        const s = o ? "class" : "style";
        ku(e, n, t.inputs[s], s, r);
      }
      function W(e, t, n, r) {
        const o = v(),
          i = G(),
          s = ie + e,
          a = o[V],
          u = i.firstCreatePass
            ? (function F0(e, t, n, r, o, i) {
                const s = t.consts,
                  u = cr(t, e, 2, r, on(s, o));
                return (
                  (function xu(e, t, n, r) {
                    if (Od()) {
                      const o = null === r ? null : { "": -1 },
                        i = (function qE(e, t) {
                          const n = e.directiveRegistry;
                          let r = null,
                            o = null;
                          if (n)
                            for (let i = 0; i < n.length; i++) {
                              const s = n[i];
                              if (Eh(t, s.selectors, !1))
                                if ((r || (r = []), gt(s)))
                                  if (null !== s.findHostDirectiveDefs) {
                                    const a = [];
                                    (o = o || new Map()),
                                      s.findHostDirectiveDefs(s, a, o),
                                      r.unshift(...a, s),
                                      Nu(e, t, a.length);
                                  } else r.unshift(s), Nu(e, t, 0);
                                else
                                  (o = o || new Map()),
                                    s.findHostDirectiveDefs?.(s, r, o),
                                    r.push(s);
                            }
                          return null === r ? null : [r, o];
                        })(e, n);
                      let s, a;
                      null === i ? (s = a = null) : ([s, a] = i),
                        null !== s && Gh(e, t, n, s, o, a),
                        o &&
                          (function ZE(e, t, n) {
                            if (t) {
                              const r = (e.localNames = []);
                              for (let o = 0; o < t.length; o += 2) {
                                const i = n[t[o + 1]];
                                if (null == i) throw new w(-301, !1);
                                r.push(t[o], i);
                              }
                            }
                          })(n, r, o);
                    }
                    n.mergedAttrs = Kr(n.mergedAttrs, n.attrs);
                  })(t, n, u, on(s, i)),
                  null !== u.attrs && Gi(u, u.attrs, !1),
                  null !== u.mergedAttrs && Gi(u, u.mergedAttrs, !0),
                  null !== t.queries && t.queries.elementStart(t, u),
                  u
                );
              })(s, i, o, t, n, r)
            : i.data[s],
          l = (o[s] = Ka(
            a,
            t,
            (function Ww() {
              return F.lFrame.currentNamespace;
            })()
          )),
          c = (function hi(e) {
            return 1 == (1 & e.flags);
          })(u);
        return (
          Tt(u, !0),
          Wf(a, l, u),
          32 != (32 & u.flags) && Ri(i, o, l, u),
          0 ===
            (function Tw() {
              return F.lFrame.elementDepthCount;
            })() && Ne(l, o),
          (function Aw() {
            F.lFrame.elementDepthCount++;
          })(),
          c &&
            ((function Tu(e, t, n) {
              Od() &&
                ((function GE(e, t, n, r) {
                  const o = n.directiveStart,
                    i = n.directiveEnd;
                  Zr(n) &&
                    (function XE(e, t, n) {
                      const r = Ke(t, e),
                        o = Vh(n),
                        i = e[ci],
                        s = Hi(
                          e,
                          Ui(
                            e,
                            o,
                            null,
                            n.onPush ? 32 : 16,
                            r,
                            t,
                            i,
                            i.createRenderer(r, n),
                            null,
                            null,
                            null
                          )
                        );
                      e[t.index] = s;
                    })(t, n, e.data[o + n.componentOffset]),
                    e.firstCreatePass || _i(n, t),
                    Ne(r, t);
                  const s = n.initialInputs;
                  for (let a = o; a < i; a++) {
                    const u = e.data[a],
                      l = bn(t, e, a, n);
                    Ne(l, t),
                      null !== s && JE(0, a - o, l, u, 0, s),
                      gt(u) && (Xe(n.index, t)[ce] = bn(t, e, a, n));
                  }
                })(e, t, n, Ke(n, t)),
                64 == (64 & n.flags) && Wh(e, t, n));
            })(i, o, u),
            Mu(i, u, o)),
          null !== r &&
            (function Au(e, t, n = Ke) {
              const r = t.localNames;
              if (null !== r) {
                let o = t.index + 1;
                for (let i = 0; i < r.length; i += 2) {
                  const s = r[i + 1],
                    a = -1 === s ? n(t, e) : e[s];
                  e[o++] = a;
                }
              }
            })(o, u),
          W
        );
      }
      function q() {
        let e = Me();
        wa()
          ? (function Ca() {
              F.lFrame.isParent = !1;
            })()
          : ((e = e.parent), Tt(e, !1));
        const t = e;
        !(function Rw() {
          F.lFrame.elementDepthCount--;
        })();
        const n = G();
        return (
          n.firstCreatePass && (mi(n, e), ya(e) && n.queries.elementEnd(e)),
          null != t.classesWithoutHost &&
            (function Yw(e) {
              return 0 != (8 & e.flags);
            })(t) &&
            Uu(n, t, v(), t.classesWithoutHost, !0),
          null != t.stylesWithoutHost &&
            (function Kw(e) {
              return 0 != (16 & e.flags);
            })(t) &&
            Uu(n, t, v(), t.stylesWithoutHost, !1),
          q
        );
      }
      function yo(e, t, n, r) {
        return W(e, t, n, r), q(), yo;
      }
      function Qi(e) {
        return !!e && "function" == typeof e.then;
      }
      const yp = function mp(e) {
        return !!e && "function" == typeof e.subscribe;
      };
      function X(e, t = "") {
        const n = v(),
          r = G(),
          o = e + ie,
          i = r.firstCreatePass ? cr(r, o, 1, t, null) : r.data[o],
          s = (n[o] = (function Ya(e, t) {
            return e.createText(t);
          })(n[V], t));
        Ri(r, n, s, i), Tt(i, !1);
      }
      const _r = "en-US";
      let pg = _r;
      class Er {}
      class Vg {}
      class Ug extends Er {
        constructor(t, n) {
          super(),
            (this._parent = n),
            (this._bootstrapComponents = []),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new Xh(this));
          const r = Qe(t);
          (this._bootstrapComponents = qt(r.bootstrap)),
            (this._r3Injector = Rh(
              t,
              n,
              [
                { provide: Er, useValue: this },
                { provide: fo, useValue: this.componentFactoryResolver },
              ],
              ne(t),
              new Set(["environment"])
            )),
            this._r3Injector.resolveInjectorInitializers(),
            (this.instance = this._r3Injector.get(t));
        }
        get injector() {
          return this._r3Injector;
        }
        destroy() {
          const t = this._r3Injector;
          !t.destroyed && t.destroy(),
            this.destroyCbs.forEach((n) => n()),
            (this.destroyCbs = null);
        }
        onDestroy(t) {
          this.destroyCbs.push(t);
        }
      }
      class rl extends Vg {
        constructor(t) {
          super(), (this.moduleType = t);
        }
        create(t) {
          return new Ug(this.moduleType, t);
        }
      }
      class RS extends Er {
        constructor(t, n, r) {
          super(),
            (this.componentFactoryResolver = new Xh(this)),
            (this.instance = null);
          const o = new ph(
            [
              ...t,
              { provide: Er, useValue: this },
              { provide: fo, useValue: this.componentFactoryResolver },
            ],
            n || ki(),
            r,
            new Set(["environment"])
          );
          (this.injector = o), o.resolveInjectorInitializers();
        }
        destroy() {
          this.injector.destroy();
        }
        onDestroy(t) {
          this.injector.onDestroy(t);
        }
      }
      function ns(e, t, n = null) {
        return new RS(e, t, n).injector;
      }
      let xS = (() => {
        class e {
          constructor(n) {
            (this._injector = n), (this.cachedInjectors = new Map());
          }
          getOrCreateStandaloneInjector(n) {
            if (!n.standalone) return null;
            if (!this.cachedInjectors.has(n.id)) {
              const r = ch(0, n.type),
                o =
                  r.length > 0
                    ? ns([r], this._injector, `Standalone[${n.type.name}]`)
                    : null;
              this.cachedInjectors.set(n.id, o);
            }
            return this.cachedInjectors.get(n.id);
          }
          ngOnDestroy() {
            try {
              for (const n of this.cachedInjectors.values())
                null !== n && n.destroy();
            } finally {
              this.cachedInjectors.clear();
            }
          }
        }
        return (
          (e.ɵprov = P({
            token: e,
            providedIn: "environment",
            factory: () => new e(T(Wt)),
          })),
          e
        );
      })();
      function Bg(e) {
        e.getStandaloneInjector = (t) =>
          t.get(xS).getOrCreateStandaloneInjector(e);
      }
      function il(e) {
        return (t) => {
          setTimeout(e, void 0, t);
        };
      }
      const Ve = class rb extends kt {
        constructor(t = !1) {
          super(), (this.__isAsync = t);
        }
        emit(t) {
          super.next(t);
        }
        subscribe(t, n, r) {
          let o = t,
            i = n || (() => null),
            s = r;
          if (t && "object" == typeof t) {
            const u = t;
            (o = u.next?.bind(u)),
              (i = u.error?.bind(u)),
              (s = u.complete?.bind(u));
          }
          this.__isAsync && ((i = il(i)), o && (o = il(o)), s && (s = il(s)));
          const a = super.subscribe({ next: o, error: i, complete: s });
          return t instanceof rt && t.add(a), a;
        }
      };
      let Dt = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = ub), e;
      })();
      function ub() {
        return (function nm(e, t) {
          let n;
          const r = t[e.index];
          if (pt(r)) n = r;
          else {
            let o;
            if (8 & e.type) o = be(r);
            else {
              const i = t[V];
              o = i.createComment("");
              const s = Ke(e, t);
              Tn(
                i,
                Ai(i, s),
                o,
                (function e_(e, t) {
                  return e.nextSibling(t);
                })(i, s),
                !1
              );
            }
            (t[e.index] = n =
              (function qh(e, t, n, r) {
                return [e, !0, !1, t, null, 0, r, n, null, null];
              })(r, t, o, e)),
              Hi(t, n);
          }
          return new em(n, e, t);
        })(Me(), v());
      }
      const lb = Dt,
        em = class extends lb {
          constructor(t, n, r) {
            super(),
              (this._lContainer = t),
              (this._hostTNode = n),
              (this._hostLView = r);
          }
          get element() {
            return sr(this._hostTNode, this._hostLView);
          }
          get injector() {
            return new Yn(this._hostTNode, this._hostLView);
          }
          get parentInjector() {
            const t = Na(this._hostTNode, this._hostLView);
            if (Qd(t)) {
              const n = wi(t, this._hostLView),
                r = Di(t);
              return new Yn(n[E].data[r + 8], n);
            }
            return new Yn(null, this._hostLView);
          }
          clear() {
            for (; this.length > 0; ) this.remove(this.length - 1);
          }
          get(t) {
            const n = tm(this._lContainer);
            return (null !== n && n[t]) || null;
          }
          get length() {
            return this._lContainer.length - Le;
          }
          createEmbeddedView(t, n, r) {
            let o, i;
            "number" == typeof r
              ? (o = r)
              : null != r && ((o = r.index), (i = r.injector));
            const s = t.createEmbeddedView(n || {}, i);
            return this.insert(s, o), s;
          }
          createComponent(t, n, r, o, i) {
            const s =
              t &&
              !(function Jr(e) {
                return "function" == typeof e;
              })(t);
            let a;
            if (s) a = n;
            else {
              const d = n || {};
              (a = d.index),
                (r = d.injector),
                (o = d.projectableNodes),
                (i = d.environmentInjector || d.ngModuleRef);
            }
            const u = s ? t : new go(K(t)),
              l = r || this.parentInjector;
            if (!i && null == u.ngModule) {
              const f = (s ? l : this.parentInjector).get(Wt, null);
              f && (i = f);
            }
            const c = u.create(l, o, void 0, i);
            return this.insert(c.hostView, a), c;
          }
          insert(t, n) {
            const r = t._lView,
              o = r[E];
            if (
              (function Mw(e) {
                return pt(e[ue]);
              })(r)
            ) {
              const c = this.indexOf(t);
              if (-1 !== c) this.detach(c);
              else {
                const d = r[ue],
                  f = new em(d, d[Re], d[ue]);
                f.detach(f.indexOf(t));
              }
            }
            const i = this._adjustIndex(n),
              s = this._lContainer;
            !(function QC(e, t, n, r) {
              const o = Le + r,
                i = n.length;
              r > 0 && (n[o - 1][ht] = t),
                r < i - Le
                  ? ((t[ht] = n[o]), cf(n, Le + r, t))
                  : (n.push(t), (t[ht] = null)),
                (t[ue] = n);
              const s = t[Wr];
              null !== s &&
                n !== s &&
                (function YC(e, t) {
                  const n = e[Wn];
                  t[xe] !== t[ue][ue][xe] && (e[Ed] = !0),
                    null === n ? (e[Wn] = [t]) : n.push(t);
                })(s, t);
              const a = t[Mt];
              null !== a && a.insertView(e), (t[j] |= 64);
            })(o, r, s, i);
            const a = tu(i, s),
              u = r[V],
              l = Ai(u, s[di]);
            return (
              null !== l &&
                (function WC(e, t, n, r, o, i) {
                  (r[Bt] = o), (r[Re] = t), ao(e, r, n, 1, o, i);
                })(o, s[Re], u, r, l, a),
              t.attachToViewContainerRef(),
              cf(al(s), i, t),
              t
            );
          }
          move(t, n) {
            return this.insert(t, n);
          }
          indexOf(t) {
            const n = tm(this._lContainer);
            return null !== n ? n.indexOf(t) : -1;
          }
          remove(t) {
            const n = this._adjustIndex(t, -1),
              r = Xa(this._lContainer, n);
            r && (Si(al(this._lContainer), n), Of(r[E], r));
          }
          detach(t) {
            const n = this._adjustIndex(t, -1),
              r = Xa(this._lContainer, n);
            return r && null != Si(al(this._lContainer), n) ? new po(r) : null;
          }
          _adjustIndex(t, n = 0) {
            return t ?? this.length + n;
          }
        };
      function tm(e) {
        return e[fi];
      }
      function al(e) {
        return e[fi] || (e[fi] = []);
      }
      function is(...e) {}
      const ss = new A("Application Initializer");
      let as = (() => {
        class e {
          constructor(n) {
            (this.appInits = n),
              (this.resolve = is),
              (this.reject = is),
              (this.initialized = !1),
              (this.done = !1),
              (this.donePromise = new Promise((r, o) => {
                (this.resolve = r), (this.reject = o);
              }));
          }
          runInitializers() {
            if (this.initialized) return;
            const n = [],
              r = () => {
                (this.done = !0), this.resolve();
              };
            if (this.appInits)
              for (let o = 0; o < this.appInits.length; o++) {
                const i = this.appInits[o]();
                if (Qi(i)) n.push(i);
                else if (yp(i)) {
                  const s = new Promise((a, u) => {
                    i.subscribe({ complete: a, error: u });
                  });
                  n.push(s);
                }
              }
            Promise.all(n)
              .then(() => {
                r();
              })
              .catch((o) => {
                this.reject(o);
              }),
              0 === n.length && r(),
              (this.initialized = !0);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(T(ss, 8));
          }),
          (e.ɵprov = P({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const Mo = new A("AppId", {
        providedIn: "root",
        factory: function Tm() {
          return `${vl()}${vl()}${vl()}`;
        },
      });
      function vl() {
        return String.fromCharCode(97 + Math.floor(25 * Math.random()));
      }
      const Am = new A("Platform Initializer"),
        Rm = new A("Platform ID", {
          providedIn: "platform",
          factory: () => "unknown",
        });
      let kb = (() => {
        class e {
          log(n) {
            console.log(n);
          }
          warn(n) {
            console.warn(n);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = P({ token: e, factory: e.ɵfac, providedIn: "platform" })),
          e
        );
      })();
      const Kt = new A("LocaleId", {
        providedIn: "root",
        factory: () =>
          z(Kt, M.Optional | M.SkipSelf) ||
          (function jb() {
            return (typeof $localize < "u" && $localize.locale) || _r;
          })(),
      });
      class Vb {
        constructor(t, n) {
          (this.ngModuleFactory = t), (this.componentFactories = n);
        }
      }
      let xm = (() => {
        class e {
          compileModuleSync(n) {
            return new rl(n);
          }
          compileModuleAsync(n) {
            return Promise.resolve(this.compileModuleSync(n));
          }
          compileModuleAndAllComponentsSync(n) {
            const r = this.compileModuleSync(n),
              i = qt(Qe(n).declarations).reduce((s, a) => {
                const u = K(a);
                return u && s.push(new go(u)), s;
              }, []);
            return new Vb(r, i);
          }
          compileModuleAndAllComponentsAsync(n) {
            return Promise.resolve(this.compileModuleAndAllComponentsSync(n));
          }
          clearCache() {}
          clearCacheFor(n) {}
          getModuleId(n) {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = P({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const Hb = (() => Promise.resolve(0))();
      function Dl(e) {
        typeof Zone > "u"
          ? Hb.then(() => {
              e && e.apply(null, null);
            })
          : Zone.current.scheduleMicroTask("scheduleMicrotask", e);
      }
      class de {
        constructor({
          enableLongStackTrace: t = !1,
          shouldCoalesceEventChangeDetection: n = !1,
          shouldCoalesceRunChangeDetection: r = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new Ve(!1)),
            (this.onMicrotaskEmpty = new Ve(!1)),
            (this.onStable = new Ve(!1)),
            (this.onError = new Ve(!1)),
            typeof Zone > "u")
          )
            throw new w(908, !1);
          Zone.assertZonePatched();
          const o = this;
          (o._nesting = 0),
            (o._outer = o._inner = Zone.current),
            Zone.TaskTrackingZoneSpec &&
              (o._inner = o._inner.fork(new Zone.TaskTrackingZoneSpec())),
            t &&
              Zone.longStackTraceZoneSpec &&
              (o._inner = o._inner.fork(Zone.longStackTraceZoneSpec)),
            (o.shouldCoalesceEventChangeDetection = !r && n),
            (o.shouldCoalesceRunChangeDetection = r),
            (o.lastRequestAnimationFrameId = -1),
            (o.nativeRequestAnimationFrame = (function zb() {
              let e = oe.requestAnimationFrame,
                t = oe.cancelAnimationFrame;
              if (typeof Zone < "u" && e && t) {
                const n = e[Zone.__symbol__("OriginalDelegate")];
                n && (e = n);
                const r = t[Zone.__symbol__("OriginalDelegate")];
                r && (t = r);
              }
              return {
                nativeRequestAnimationFrame: e,
                nativeCancelAnimationFrame: t,
              };
            })().nativeRequestAnimationFrame),
            (function qb(e) {
              const t = () => {
                !(function Wb(e) {
                  e.isCheckStableRunning ||
                    -1 !== e.lastRequestAnimationFrameId ||
                    ((e.lastRequestAnimationFrameId =
                      e.nativeRequestAnimationFrame.call(oe, () => {
                        e.fakeTopEventTask ||
                          (e.fakeTopEventTask = Zone.root.scheduleEventTask(
                            "fakeTopEventTask",
                            () => {
                              (e.lastRequestAnimationFrameId = -1),
                                Cl(e),
                                (e.isCheckStableRunning = !0),
                                wl(e),
                                (e.isCheckStableRunning = !1);
                            },
                            void 0,
                            () => {},
                            () => {}
                          )),
                          e.fakeTopEventTask.invoke();
                      })),
                    Cl(e));
                })(e);
              };
              e._inner = e._inner.fork({
                name: "angular",
                properties: { isAngularZone: !0 },
                onInvokeTask: (n, r, o, i, s, a) => {
                  try {
                    return Om(e), n.invokeTask(o, i, s, a);
                  } finally {
                    ((e.shouldCoalesceEventChangeDetection &&
                      "eventTask" === i.type) ||
                      e.shouldCoalesceRunChangeDetection) &&
                      t(),
                      Fm(e);
                  }
                },
                onInvoke: (n, r, o, i, s, a, u) => {
                  try {
                    return Om(e), n.invoke(o, i, s, a, u);
                  } finally {
                    e.shouldCoalesceRunChangeDetection && t(), Fm(e);
                  }
                },
                onHasTask: (n, r, o, i) => {
                  n.hasTask(o, i),
                    r === o &&
                      ("microTask" == i.change
                        ? ((e._hasPendingMicrotasks = i.microTask),
                          Cl(e),
                          wl(e))
                        : "macroTask" == i.change &&
                          (e.hasPendingMacrotasks = i.macroTask));
                },
                onHandleError: (n, r, o, i) => (
                  n.handleError(o, i),
                  e.runOutsideAngular(() => e.onError.emit(i)),
                  !1
                ),
              });
            })(o);
        }
        static isInAngularZone() {
          return typeof Zone < "u" && !0 === Zone.current.get("isAngularZone");
        }
        static assertInAngularZone() {
          if (!de.isInAngularZone()) throw new w(909, !1);
        }
        static assertNotInAngularZone() {
          if (de.isInAngularZone()) throw new w(909, !1);
        }
        run(t, n, r) {
          return this._inner.run(t, n, r);
        }
        runTask(t, n, r, o) {
          const i = this._inner,
            s = i.scheduleEventTask("NgZoneEvent: " + o, t, Gb, is, is);
          try {
            return i.runTask(s, n, r);
          } finally {
            i.cancelTask(s);
          }
        }
        runGuarded(t, n, r) {
          return this._inner.runGuarded(t, n, r);
        }
        runOutsideAngular(t) {
          return this._outer.run(t);
        }
      }
      const Gb = {};
      function wl(e) {
        if (0 == e._nesting && !e.hasPendingMicrotasks && !e.isStable)
          try {
            e._nesting++, e.onMicrotaskEmpty.emit(null);
          } finally {
            if ((e._nesting--, !e.hasPendingMicrotasks))
              try {
                e.runOutsideAngular(() => e.onStable.emit(null));
              } finally {
                e.isStable = !0;
              }
          }
      }
      function Cl(e) {
        e.hasPendingMicrotasks = !!(
          e._hasPendingMicrotasks ||
          ((e.shouldCoalesceEventChangeDetection ||
            e.shouldCoalesceRunChangeDetection) &&
            -1 !== e.lastRequestAnimationFrameId)
        );
      }
      function Om(e) {
        e._nesting++,
          e.isStable && ((e.isStable = !1), e.onUnstable.emit(null));
      }
      function Fm(e) {
        e._nesting--, wl(e);
      }
      class Zb {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new Ve()),
            (this.onMicrotaskEmpty = new Ve()),
            (this.onStable = new Ve()),
            (this.onError = new Ve());
        }
        run(t, n, r) {
          return t.apply(n, r);
        }
        runGuarded(t, n, r) {
          return t.apply(n, r);
        }
        runOutsideAngular(t) {
          return t();
        }
        runTask(t, n, r, o) {
          return t.apply(n, r);
        }
      }
      const Lm = new A(""),
        us = new A("");
      let Il,
        _l = (() => {
          class e {
            constructor(n, r, o) {
              (this._ngZone = n),
                (this.registry = r),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                Il ||
                  ((function Qb(e) {
                    Il = e;
                  })(o),
                  o.addToWindow(r)),
                this._watchAngularEvents(),
                n.run(() => {
                  this.taskTrackingZone =
                    typeof Zone > "u"
                      ? null
                      : Zone.current.get("TaskTrackingZone");
                });
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  (this._didWork = !0), (this._isZoneStable = !1);
                },
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      de.assertNotInAngularZone(),
                        Dl(() => {
                          (this._isZoneStable = !0),
                            this._runCallbacksIfReady();
                        });
                    },
                  });
                });
            }
            increasePendingRequestCount() {
              return (
                (this._pendingCount += 1),
                (this._didWork = !0),
                this._pendingCount
              );
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error("pending async requests below zero");
              return this._runCallbacksIfReady(), this._pendingCount;
            }
            isStable() {
              return (
                this._isZoneStable &&
                0 === this._pendingCount &&
                !this._ngZone.hasPendingMacrotasks
              );
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                Dl(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let n = this._callbacks.pop();
                    clearTimeout(n.timeoutId), n.doneCb(this._didWork);
                  }
                  this._didWork = !1;
                });
              else {
                let n = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(
                  (r) =>
                    !r.updateCb ||
                    !r.updateCb(n) ||
                    (clearTimeout(r.timeoutId), !1)
                )),
                  (this._didWork = !0);
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map((n) => ({
                    source: n.source,
                    creationLocation: n.creationLocation,
                    data: n.data,
                  }))
                : [];
            }
            addCallback(n, r, o) {
              let i = -1;
              r &&
                r > 0 &&
                (i = setTimeout(() => {
                  (this._callbacks = this._callbacks.filter(
                    (s) => s.timeoutId !== i
                  )),
                    n(this._didWork, this.getPendingTasks());
                }, r)),
                this._callbacks.push({ doneCb: n, timeoutId: i, updateCb: o });
            }
            whenStable(n, r, o) {
              if (o && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?'
                );
              this.addCallback(n, r, o), this._runCallbacksIfReady();
            }
            getPendingRequestCount() {
              return this._pendingCount;
            }
            registerApplication(n) {
              this.registry.registerApplication(n, this);
            }
            unregisterApplication(n) {
              this.registry.unregisterApplication(n);
            }
            findProviders(n, r, o) {
              return [];
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(T(de), T(El), T(us));
            }),
            (e.ɵprov = P({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        El = (() => {
          class e {
            constructor() {
              this._applications = new Map();
            }
            registerApplication(n, r) {
              this._applications.set(n, r);
            }
            unregisterApplication(n) {
              this._applications.delete(n);
            }
            unregisterAllApplications() {
              this._applications.clear();
            }
            getTestability(n) {
              return this._applications.get(n) || null;
            }
            getAllTestabilities() {
              return Array.from(this._applications.values());
            }
            getAllRootElements() {
              return Array.from(this._applications.keys());
            }
            findTestabilityInTree(n, r = !0) {
              return Il?.findTestabilityInTree(this, n, r) ?? null;
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = P({
              token: e,
              factory: e.ɵfac,
              providedIn: "platform",
            })),
            e
          );
        })();
      const Xt = !1;
      let ln = null;
      const km = new A("AllowMultipleToken"),
        Sl = new A("PlatformDestroyListeners"),
        jm = new A("appBootstrapListener");
      class $m {
        constructor(t, n) {
          (this.name = t), (this.token = n);
        }
      }
      function Um(e, t, n = []) {
        const r = `Platform: ${t}`,
          o = new A(r);
        return (i = []) => {
          let s = bl();
          if (!s || s.injector.get(km, !1)) {
            const a = [...n, ...i, { provide: o, useValue: !0 }];
            e
              ? e(a)
              : (function Xb(e) {
                  if (ln && !ln.get(km, !1)) throw new w(400, !1);
                  ln = e;
                  const t = e.get(Hm);
                  (function Vm(e) {
                    const t = e.get(Am, null);
                    t && t.forEach((n) => n());
                  })(e);
                })(
                  (function Bm(e = [], t) {
                    return Zt.create({
                      name: t,
                      providers: [
                        { provide: pu, useValue: "platform" },
                        { provide: Sl, useValue: new Set([() => (ln = null)]) },
                        ...e,
                      ],
                    });
                  })(a, r)
                );
          }
          return (function eM(e) {
            const t = bl();
            if (!t) throw new w(401, !1);
            return t;
          })();
        };
      }
      function bl() {
        return ln?.get(Hm) ?? null;
      }
      let Hm = (() => {
        class e {
          constructor(n) {
            (this._injector = n),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1);
          }
          bootstrapModuleFactory(n, r) {
            const o = (function Gm(e, t) {
                let n;
                return (
                  (n =
                    "noop" === e
                      ? new Zb()
                      : ("zone.js" === e ? void 0 : e) || new de(t)),
                  n
                );
              })(
                r?.ngZone,
                (function zm(e) {
                  return {
                    enableLongStackTrace: !1,
                    shouldCoalesceEventChangeDetection:
                      !(!e || !e.ngZoneEventCoalescing) || !1,
                    shouldCoalesceRunChangeDetection:
                      !(!e || !e.ngZoneRunCoalescing) || !1,
                  };
                })(r)
              ),
              i = [{ provide: de, useValue: o }];
            return o.run(() => {
              const s = Zt.create({
                  providers: i,
                  parent: this.injector,
                  name: n.moduleType.name,
                }),
                a = n.create(s),
                u = a.injector.get(ar, null);
              if (!u) throw new w(402, !1);
              return (
                o.runOutsideAngular(() => {
                  const l = o.onError.subscribe({
                    next: (c) => {
                      u.handleError(c);
                    },
                  });
                  a.onDestroy(() => {
                    cs(this._modules, a), l.unsubscribe();
                  });
                }),
                (function Wm(e, t, n) {
                  try {
                    const r = n();
                    return Qi(r)
                      ? r.catch((o) => {
                          throw (
                            (t.runOutsideAngular(() => e.handleError(o)), o)
                          );
                        })
                      : r;
                  } catch (r) {
                    throw (t.runOutsideAngular(() => e.handleError(r)), r);
                  }
                })(u, o, () => {
                  const l = a.injector.get(as);
                  return (
                    l.runInitializers(),
                    l.donePromise.then(
                      () => (
                        (function gg(e) {
                          ot(e, "Expected localeId to be defined"),
                            "string" == typeof e &&
                              (pg = e.toLowerCase().replace(/_/g, "-"));
                        })(a.injector.get(Kt, _r) || _r),
                        this._moduleDoBootstrap(a),
                        a
                      )
                    )
                  );
                })
              );
            });
          }
          bootstrapModule(n, r = []) {
            const o = qm({}, r);
            return (function Yb(e, t, n) {
              const r = new rl(n);
              return Promise.resolve(r);
            })(0, 0, n).then((i) => this.bootstrapModuleFactory(i, o));
          }
          _moduleDoBootstrap(n) {
            const r = n.injector.get(ls);
            if (n._bootstrapComponents.length > 0)
              n._bootstrapComponents.forEach((o) => r.bootstrap(o));
            else {
              if (!n.instance.ngDoBootstrap) throw new w(-403, !1);
              n.instance.ngDoBootstrap(r);
            }
            this._modules.push(n);
          }
          onDestroy(n) {
            this._destroyListeners.push(n);
          }
          get injector() {
            return this._injector;
          }
          destroy() {
            if (this._destroyed) throw new w(404, !1);
            this._modules.slice().forEach((r) => r.destroy()),
              this._destroyListeners.forEach((r) => r());
            const n = this._injector.get(Sl, null);
            n && (n.forEach((r) => r()), n.clear()), (this._destroyed = !0);
          }
          get destroyed() {
            return this._destroyed;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(T(Zt));
          }),
          (e.ɵprov = P({ token: e, factory: e.ɵfac, providedIn: "platform" })),
          e
        );
      })();
      function qm(e, t) {
        return Array.isArray(t) ? t.reduce(qm, e) : { ...e, ...t };
      }
      let ls = (() => {
        class e {
          get destroyed() {
            return this._destroyed;
          }
          get injector() {
            return this._injector;
          }
          constructor(n, r, o) {
            (this._zone = n),
              (this._injector = r),
              (this._exceptionHandler = o),
              (this._bootstrapListeners = []),
              (this._views = []),
              (this._runningTick = !1),
              (this._stable = !0),
              (this._destroyed = !1),
              (this._destroyListeners = []),
              (this.componentTypes = []),
              (this.components = []),
              (this._onMicrotaskEmptySubscription =
                this._zone.onMicrotaskEmpty.subscribe({
                  next: () => {
                    this._zone.run(() => {
                      this.tick();
                    });
                  },
                }));
            const i = new ve((a) => {
                (this._stable =
                  this._zone.isStable &&
                  !this._zone.hasPendingMacrotasks &&
                  !this._zone.hasPendingMicrotasks),
                  this._zone.runOutsideAngular(() => {
                    a.next(this._stable), a.complete();
                  });
              }),
              s = new ve((a) => {
                let u;
                this._zone.runOutsideAngular(() => {
                  u = this._zone.onStable.subscribe(() => {
                    de.assertNotInAngularZone(),
                      Dl(() => {
                        !this._stable &&
                          !this._zone.hasPendingMacrotasks &&
                          !this._zone.hasPendingMicrotasks &&
                          ((this._stable = !0), a.next(!0));
                      });
                  });
                });
                const l = this._zone.onUnstable.subscribe(() => {
                  de.assertInAngularZone(),
                    this._stable &&
                      ((this._stable = !1),
                      this._zone.runOutsideAngular(() => {
                        a.next(!1);
                      }));
                });
                return () => {
                  u.unsubscribe(), l.unsubscribe();
                };
              });
            this.isStable = (function GD(...e) {
              const t = $r(e),
                n = (function jD(e, t) {
                  return "number" == typeof na(e) ? e.pop() : t;
                })(e, 1 / 0),
                r = e;
              return r.length
                ? 1 === r.length
                  ? ft(r[0])
                  : Vn(n)(De(r, t))
                : It;
            })(
              i,
              s.pipe(
                (function WD(e = {}) {
                  const {
                    connector: t = () => new kt(),
                    resetOnError: n = !0,
                    resetOnComplete: r = !0,
                    resetOnRefCountZero: o = !0,
                  } = e;
                  return (i) => {
                    let s,
                      a,
                      u,
                      l = 0,
                      c = !1,
                      d = !1;
                    const f = () => {
                        a?.unsubscribe(), (a = void 0);
                      },
                      h = () => {
                        f(), (s = u = void 0), (c = d = !1);
                      },
                      p = () => {
                        const g = s;
                        h(), g?.unsubscribe();
                      };
                    return Ee((g, m) => {
                      l++, !d && !c && f();
                      const D = (u = u ?? t());
                      m.add(() => {
                        l--, 0 === l && !d && !c && (a = ra(p, o));
                      }),
                        D.subscribe(m),
                        !s &&
                          l > 0 &&
                          ((s = new jr({
                            next: (_) => D.next(_),
                            error: (_) => {
                              (d = !0), f(), (a = ra(h, n, _)), D.error(_);
                            },
                            complete: () => {
                              (c = !0), f(), (a = ra(h, r)), D.complete();
                            },
                          })),
                          ft(g).subscribe(s));
                    })(i);
                  };
                })()
              )
            );
          }
          bootstrap(n, r) {
            const o = n instanceof mh;
            if (!this._injector.get(as).done) {
              !o &&
                (function Bn(e) {
                  const t = K(e) || Ae(e) || He(e);
                  return null !== t && t.standalone;
                })(n);
              throw new w(405, Xt);
            }
            let s;
            (s = o ? n : this._injector.get(fo).resolveComponentFactory(n)),
              this.componentTypes.push(s.componentType);
            const a = (function Kb(e) {
                return e.isBoundToModule;
              })(s)
                ? void 0
                : this._injector.get(Er),
              l = s.create(Zt.NULL, [], r || s.selector, a),
              c = l.location.nativeElement,
              d = l.injector.get(Lm, null);
            return (
              d?.registerApplication(c),
              l.onDestroy(() => {
                this.detachView(l.hostView),
                  cs(this.components, l),
                  d?.unregisterApplication(c);
              }),
              this._loadComponent(l),
              l
            );
          }
          tick() {
            if (this._runningTick) throw new w(101, !1);
            try {
              this._runningTick = !0;
              for (let n of this._views) n.detectChanges();
            } catch (n) {
              this._zone.runOutsideAngular(() =>
                this._exceptionHandler.handleError(n)
              );
            } finally {
              this._runningTick = !1;
            }
          }
          attachView(n) {
            const r = n;
            this._views.push(r), r.attachToAppRef(this);
          }
          detachView(n) {
            const r = n;
            cs(this._views, r), r.detachFromAppRef();
          }
          _loadComponent(n) {
            this.attachView(n.hostView), this.tick(), this.components.push(n);
            const r = this._injector.get(jm, []);
            r.push(...this._bootstrapListeners), r.forEach((o) => o(n));
          }
          ngOnDestroy() {
            if (!this._destroyed)
              try {
                this._destroyListeners.forEach((n) => n()),
                  this._views.slice().forEach((n) => n.destroy()),
                  this._onMicrotaskEmptySubscription.unsubscribe();
              } finally {
                (this._destroyed = !0),
                  (this._views = []),
                  (this._bootstrapListeners = []),
                  (this._destroyListeners = []);
              }
          }
          onDestroy(n) {
            return (
              this._destroyListeners.push(n),
              () => cs(this._destroyListeners, n)
            );
          }
          destroy() {
            if (this._destroyed) throw new w(406, !1);
            const n = this._injector;
            n.destroy && !n.destroyed && n.destroy();
          }
          get viewCount() {
            return this._views.length;
          }
          warnIfDestroyed() {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(T(de), T(Wt), T(ar));
          }),
          (e.ɵprov = P({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      function cs(e, t) {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1);
      }
      let Ml = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = nM), e;
      })();
      function nM(e) {
        return (function rM(e, t, n) {
          if (Zr(e) && !n) {
            const r = Xe(e.index, t);
            return new po(r, r);
          }
          return 47 & e.type ? new po(t[xe], t) : null;
        })(Me(), v(), 16 == (16 & e));
      }
      const mM = Um(null, "core", []);
      let yM = (() => {
          class e {
            constructor(n) {}
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(T(ls));
            }),
            (e.ɵmod = Cn({ type: e })),
            (e.ɵinj = rn({})),
            e
          );
        })(),
        Pl = null;
      function On() {
        return Pl;
      }
      class wM {}
      const We = new A("DocumentToken");
      let Ol = (() => {
        class e {
          historyGo(n) {
            throw new Error("Not implemented");
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = P({
            token: e,
            factory: function () {
              return (function CM() {
                return T(oy);
              })();
            },
            providedIn: "platform",
          })),
          e
        );
      })();
      const _M = new A("Location Initialized");
      let oy = (() => {
        class e extends Ol {
          constructor(n) {
            super(),
              (this._doc = n),
              (this._location = window.location),
              (this._history = window.history);
          }
          getBaseHrefFromDOM() {
            return On().getBaseHref(this._doc);
          }
          onPopState(n) {
            const r = On().getGlobalEventTarget(this._doc, "window");
            return (
              r.addEventListener("popstate", n, !1),
              () => r.removeEventListener("popstate", n)
            );
          }
          onHashChange(n) {
            const r = On().getGlobalEventTarget(this._doc, "window");
            return (
              r.addEventListener("hashchange", n, !1),
              () => r.removeEventListener("hashchange", n)
            );
          }
          get href() {
            return this._location.href;
          }
          get protocol() {
            return this._location.protocol;
          }
          get hostname() {
            return this._location.hostname;
          }
          get port() {
            return this._location.port;
          }
          get pathname() {
            return this._location.pathname;
          }
          get search() {
            return this._location.search;
          }
          get hash() {
            return this._location.hash;
          }
          set pathname(n) {
            this._location.pathname = n;
          }
          pushState(n, r, o) {
            iy() ? this._history.pushState(n, r, o) : (this._location.hash = o);
          }
          replaceState(n, r, o) {
            iy()
              ? this._history.replaceState(n, r, o)
              : (this._location.hash = o);
          }
          forward() {
            this._history.forward();
          }
          back() {
            this._history.back();
          }
          historyGo(n = 0) {
            this._history.go(n);
          }
          getState() {
            return this._history.state;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(T(We));
          }),
          (e.ɵprov = P({
            token: e,
            factory: function () {
              return (function EM() {
                return new oy(T(We));
              })();
            },
            providedIn: "platform",
          })),
          e
        );
      })();
      function iy() {
        return !!window.history.pushState;
      }
      function Fl(e, t) {
        if (0 == e.length) return t;
        if (0 == t.length) return e;
        let n = 0;
        return (
          e.endsWith("/") && n++,
          t.startsWith("/") && n++,
          2 == n ? e + t.substring(1) : 1 == n ? e + t : e + "/" + t
        );
      }
      function sy(e) {
        const t = e.match(/#|\?|$/),
          n = (t && t.index) || e.length;
        return e.slice(0, n - ("/" === e[n - 1] ? 1 : 0)) + e.slice(n);
      }
      function Jt(e) {
        return e && "?" !== e[0] ? "?" + e : e;
      }
      let Fn = (() => {
        class e {
          historyGo(n) {
            throw new Error("Not implemented");
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = P({
            token: e,
            factory: function () {
              return z(uy);
            },
            providedIn: "root",
          })),
          e
        );
      })();
      const ay = new A("appBaseHref");
      let uy = (() => {
          class e extends Fn {
            constructor(n, r) {
              super(),
                (this._platformLocation = n),
                (this._removeListenerFns = []),
                (this._baseHref =
                  r ??
                  this._platformLocation.getBaseHrefFromDOM() ??
                  z(We).location?.origin ??
                  "");
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(n) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(n),
                this._platformLocation.onHashChange(n)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            prepareExternalUrl(n) {
              return Fl(this._baseHref, n);
            }
            path(n = !1) {
              const r =
                  this._platformLocation.pathname +
                  Jt(this._platformLocation.search),
                o = this._platformLocation.hash;
              return o && n ? `${r}${o}` : r;
            }
            pushState(n, r, o, i) {
              const s = this.prepareExternalUrl(o + Jt(i));
              this._platformLocation.pushState(n, r, s);
            }
            replaceState(n, r, o, i) {
              const s = this.prepareExternalUrl(o + Jt(i));
              this._platformLocation.replaceState(n, r, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            getState() {
              return this._platformLocation.getState();
            }
            historyGo(n = 0) {
              this._platformLocation.historyGo?.(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(T(Ol), T(ay, 8));
            }),
            (e.ɵprov = P({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })(),
        IM = (() => {
          class e extends Fn {
            constructor(n, r) {
              super(),
                (this._platformLocation = n),
                (this._baseHref = ""),
                (this._removeListenerFns = []),
                null != r && (this._baseHref = r);
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(n) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(n),
                this._platformLocation.onHashChange(n)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            path(n = !1) {
              let r = this._platformLocation.hash;
              return null == r && (r = "#"), r.length > 0 ? r.substring(1) : r;
            }
            prepareExternalUrl(n) {
              const r = Fl(this._baseHref, n);
              return r.length > 0 ? "#" + r : r;
            }
            pushState(n, r, o, i) {
              let s = this.prepareExternalUrl(o + Jt(i));
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.pushState(n, r, s);
            }
            replaceState(n, r, o, i) {
              let s = this.prepareExternalUrl(o + Jt(i));
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.replaceState(n, r, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            getState() {
              return this._platformLocation.getState();
            }
            historyGo(n = 0) {
              this._platformLocation.historyGo?.(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(T(Ol), T(ay, 8));
            }),
            (e.ɵprov = P({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        Ll = (() => {
          class e {
            constructor(n) {
              (this._subject = new Ve()),
                (this._urlChangeListeners = []),
                (this._urlChangeSubscription = null),
                (this._locationStrategy = n);
              const r = this._locationStrategy.getBaseHref();
              (this._basePath = (function MM(e) {
                if (new RegExp("^(https?:)?//").test(e)) {
                  const [, n] = e.split(/\/\/[^\/]+/);
                  return n;
                }
                return e;
              })(sy(ly(r)))),
                this._locationStrategy.onPopState((o) => {
                  this._subject.emit({
                    url: this.path(!0),
                    pop: !0,
                    state: o.state,
                    type: o.type,
                  });
                });
            }
            ngOnDestroy() {
              this._urlChangeSubscription?.unsubscribe(),
                (this._urlChangeListeners = []);
            }
            path(n = !1) {
              return this.normalize(this._locationStrategy.path(n));
            }
            getState() {
              return this._locationStrategy.getState();
            }
            isCurrentPathEqualTo(n, r = "") {
              return this.path() == this.normalize(n + Jt(r));
            }
            normalize(n) {
              return e.stripTrailingSlash(
                (function bM(e, t) {
                  if (!e || !t.startsWith(e)) return t;
                  const n = t.substring(e.length);
                  return "" === n || ["/", ";", "?", "#"].includes(n[0])
                    ? n
                    : t;
                })(this._basePath, ly(n))
              );
            }
            prepareExternalUrl(n) {
              return (
                n && "/" !== n[0] && (n = "/" + n),
                this._locationStrategy.prepareExternalUrl(n)
              );
            }
            go(n, r = "", o = null) {
              this._locationStrategy.pushState(o, "", n, r),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(n + Jt(r)),
                  o
                );
            }
            replaceState(n, r = "", o = null) {
              this._locationStrategy.replaceState(o, "", n, r),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(n + Jt(r)),
                  o
                );
            }
            forward() {
              this._locationStrategy.forward();
            }
            back() {
              this._locationStrategy.back();
            }
            historyGo(n = 0) {
              this._locationStrategy.historyGo?.(n);
            }
            onUrlChange(n) {
              return (
                this._urlChangeListeners.push(n),
                this._urlChangeSubscription ||
                  (this._urlChangeSubscription = this.subscribe((r) => {
                    this._notifyUrlChangeListeners(r.url, r.state);
                  })),
                () => {
                  const r = this._urlChangeListeners.indexOf(n);
                  this._urlChangeListeners.splice(r, 1),
                    0 === this._urlChangeListeners.length &&
                      (this._urlChangeSubscription?.unsubscribe(),
                      (this._urlChangeSubscription = null));
                }
              );
            }
            _notifyUrlChangeListeners(n = "", r) {
              this._urlChangeListeners.forEach((o) => o(n, r));
            }
            subscribe(n, r, o) {
              return this._subject.subscribe({
                next: n,
                error: r,
                complete: o,
              });
            }
          }
          return (
            (e.normalizeQueryParams = Jt),
            (e.joinWithSlash = Fl),
            (e.stripTrailingSlash = sy),
            (e.ɵfac = function (n) {
              return new (n || e)(T(Fn));
            }),
            (e.ɵprov = P({
              token: e,
              factory: function () {
                return (function SM() {
                  return new Ll(T(Fn));
                })();
              },
              providedIn: "root",
            })),
            e
          );
        })();
      function ly(e) {
        return e.replace(/\/index.html$/, "");
      }
      let BT = (() => {
        class e {}
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵmod = Cn({ type: e })),
          (e.ɵinj = rn({})),
          e
        );
      })();
      let WT = (() => {
        class e {}
        return (
          (e.ɵprov = P({
            token: e,
            providedIn: "root",
            factory: () => new qT(T(We), window),
          })),
          e
        );
      })();
      class qT {
        constructor(t, n) {
          (this.document = t), (this.window = n), (this.offset = () => [0, 0]);
        }
        setOffset(t) {
          this.offset = Array.isArray(t) ? () => t : t;
        }
        getScrollPosition() {
          return this.supportsScrolling()
            ? [this.window.pageXOffset, this.window.pageYOffset]
            : [0, 0];
        }
        scrollToPosition(t) {
          this.supportsScrolling() && this.window.scrollTo(t[0], t[1]);
        }
        scrollToAnchor(t) {
          if (!this.supportsScrolling()) return;
          const n = (function ZT(e, t) {
            const n = e.getElementById(t) || e.getElementsByName(t)[0];
            if (n) return n;
            if (
              "function" == typeof e.createTreeWalker &&
              e.body &&
              (e.body.createShadowRoot || e.body.attachShadow)
            ) {
              const r = e.createTreeWalker(e.body, NodeFilter.SHOW_ELEMENT);
              let o = r.currentNode;
              for (; o; ) {
                const i = o.shadowRoot;
                if (i) {
                  const s =
                    i.getElementById(t) || i.querySelector(`[name="${t}"]`);
                  if (s) return s;
                }
                o = r.nextNode();
              }
            }
            return null;
          })(this.document, t);
          n && (this.scrollToElement(n), n.focus());
        }
        setHistoryScrollRestoration(t) {
          if (this.supportScrollRestoration()) {
            const n = this.window.history;
            n && n.scrollRestoration && (n.scrollRestoration = t);
          }
        }
        scrollToElement(t) {
          const n = t.getBoundingClientRect(),
            r = n.left + this.window.pageXOffset,
            o = n.top + this.window.pageYOffset,
            i = this.offset();
          this.window.scrollTo(r - i[0], o - i[1]);
        }
        supportScrollRestoration() {
          try {
            if (!this.supportsScrolling()) return !1;
            const t =
              by(this.window.history) ||
              by(Object.getPrototypeOf(this.window.history));
            return !(!t || (!t.writable && !t.set));
          } catch {
            return !1;
          }
        }
        supportsScrolling() {
          try {
            return (
              !!this.window &&
              !!this.window.scrollTo &&
              "pageXOffset" in this.window
            );
          } catch {
            return !1;
          }
        }
      }
      function by(e) {
        return Object.getOwnPropertyDescriptor(e, "scrollRestoration");
      }
      class _A extends wM {
        constructor() {
          super(...arguments), (this.supportsDOMEvents = !0);
        }
      }
      class Jl extends _A {
        static makeCurrent() {
          !(function DM(e) {
            Pl || (Pl = e);
          })(new Jl());
        }
        onAndCancel(t, n, r) {
          return (
            t.addEventListener(n, r, !1),
            () => {
              t.removeEventListener(n, r, !1);
            }
          );
        }
        dispatchEvent(t, n) {
          t.dispatchEvent(n);
        }
        remove(t) {
          t.parentNode && t.parentNode.removeChild(t);
        }
        createElement(t, n) {
          return (n = n || this.getDefaultDocument()).createElement(t);
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument("fakeTitle");
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(t) {
          return t.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(t) {
          return t instanceof DocumentFragment;
        }
        getGlobalEventTarget(t, n) {
          return "window" === n
            ? window
            : "document" === n
            ? t
            : "body" === n
            ? t.body
            : null;
        }
        getBaseHref(t) {
          const n = (function EA() {
            return (
              (No = No || document.querySelector("base")),
              No ? No.getAttribute("href") : null
            );
          })();
          return null == n
            ? null
            : (function IA(e) {
                (Ss = Ss || document.createElement("a")),
                  Ss.setAttribute("href", e);
                const t = Ss.pathname;
                return "/" === t.charAt(0) ? t : `/${t}`;
              })(n);
        }
        resetBaseElement() {
          No = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        getCookie(t) {
          return (function cT(e, t) {
            t = encodeURIComponent(t);
            for (const n of e.split(";")) {
              const r = n.indexOf("="),
                [o, i] = -1 == r ? [n, ""] : [n.slice(0, r), n.slice(r + 1)];
              if (o.trim() === t) return decodeURIComponent(i);
            }
            return null;
          })(document.cookie, t);
        }
      }
      let Ss,
        No = null;
      const xy = new A("TRANSITION_ID"),
        bA = [
          {
            provide: ss,
            useFactory: function SA(e, t, n) {
              return () => {
                n.get(as).donePromise.then(() => {
                  const r = On(),
                    o = t.querySelectorAll(`style[ng-transition="${e}"]`);
                  for (let i = 0; i < o.length; i++) r.remove(o[i]);
                });
              };
            },
            deps: [xy, We, Zt],
            multi: !0,
          },
        ];
      let TA = (() => {
        class e {
          build() {
            return new XMLHttpRequest();
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = P({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const bs = new A("EventManagerPlugins");
      let Ms = (() => {
        class e {
          constructor(n, r) {
            (this._zone = r),
              (this._eventNameToPlugin = new Map()),
              n.forEach((o) => {
                o.manager = this;
              }),
              (this._plugins = n.slice().reverse());
          }
          addEventListener(n, r, o) {
            return this._findPluginFor(r).addEventListener(n, r, o);
          }
          addGlobalEventListener(n, r, o) {
            return this._findPluginFor(r).addGlobalEventListener(n, r, o);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(n) {
            const r = this._eventNameToPlugin.get(n);
            if (r) return r;
            const o = this._plugins;
            for (let i = 0; i < o.length; i++) {
              const s = o[i];
              if (s.supports(n)) return this._eventNameToPlugin.set(n, s), s;
            }
            throw new Error(`No event manager plugin found for event ${n}`);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(T(bs), T(de));
          }),
          (e.ɵprov = P({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class Ny {
        constructor(t) {
          this._doc = t;
        }
        addGlobalEventListener(t, n, r) {
          const o = On().getGlobalEventTarget(this._doc, t);
          if (!o)
            throw new Error(`Unsupported event target ${o} for event ${n}`);
          return this.addEventListener(o, n, r);
        }
      }
      let Py = (() => {
          class e {
            constructor() {
              this.usageCount = new Map();
            }
            addStyles(n) {
              for (const r of n)
                1 === this.changeUsageCount(r, 1) && this.onStyleAdded(r);
            }
            removeStyles(n) {
              for (const r of n)
                0 === this.changeUsageCount(r, -1) && this.onStyleRemoved(r);
            }
            onStyleRemoved(n) {}
            onStyleAdded(n) {}
            getAllStyles() {
              return this.usageCount.keys();
            }
            changeUsageCount(n, r) {
              const o = this.usageCount;
              let i = o.get(n) ?? 0;
              return (i += r), i > 0 ? o.set(n, i) : o.delete(n), i;
            }
            ngOnDestroy() {
              for (const n of this.getAllStyles()) this.onStyleRemoved(n);
              this.usageCount.clear();
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = P({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        Po = (() => {
          class e extends Py {
            constructor(n) {
              super(),
                (this.doc = n),
                (this.styleRef = new Map()),
                (this.hostNodes = new Set()),
                this.resetHostNodes();
            }
            onStyleAdded(n) {
              for (const r of this.hostNodes) this.addStyleToHost(r, n);
            }
            onStyleRemoved(n) {
              const r = this.styleRef;
              r.get(n)?.forEach((i) => i.remove()), r.delete(n);
            }
            ngOnDestroy() {
              super.ngOnDestroy(), this.styleRef.clear(), this.resetHostNodes();
            }
            addHost(n) {
              this.hostNodes.add(n);
              for (const r of this.getAllStyles()) this.addStyleToHost(n, r);
            }
            removeHost(n) {
              this.hostNodes.delete(n);
            }
            addStyleToHost(n, r) {
              const o = this.doc.createElement("style");
              (o.textContent = r), n.appendChild(o);
              const i = this.styleRef.get(r);
              i ? i.push(o) : this.styleRef.set(r, [o]);
            }
            resetHostNodes() {
              const n = this.hostNodes;
              n.clear(), n.add(this.doc.head);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(T(We));
            }),
            (e.ɵprov = P({ token: e, factory: e.ɵfac })),
            e
          );
        })();
      const ec = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
          math: "http://www.w3.org/1998/MathML/",
        },
        tc = /%COMP%/g,
        Ly = new A("RemoveStylesOnCompDestory", {
          providedIn: "root",
          factory: () => !1,
        });
      function ky(e, t) {
        return t.flat(100).map((n) => n.replace(tc, e));
      }
      function jy(e) {
        return (t) => {
          if ("__ngUnwrap__" === t) return e;
          !1 === e(t) && (t.preventDefault(), (t.returnValue = !1));
        };
      }
      let nc = (() => {
        class e {
          constructor(n, r, o, i) {
            (this.eventManager = n),
              (this.sharedStylesHost = r),
              (this.appId = o),
              (this.removeStylesOnCompDestory = i),
              (this.rendererByCompId = new Map()),
              (this.defaultRenderer = new rc(n));
          }
          createRenderer(n, r) {
            if (!n || !r) return this.defaultRenderer;
            const o = this.getOrCreateRenderer(n, r);
            return (
              o instanceof Uy
                ? o.applyToHost(n)
                : o instanceof oc && o.applyStyles(),
              o
            );
          }
          getOrCreateRenderer(n, r) {
            const o = this.rendererByCompId;
            let i = o.get(r.id);
            if (!i) {
              const s = this.eventManager,
                a = this.sharedStylesHost,
                u = this.removeStylesOnCompDestory;
              switch (r.encapsulation) {
                case bt.Emulated:
                  i = new Uy(s, a, r, this.appId, u);
                  break;
                case bt.ShadowDom:
                  return new FA(s, a, n, r);
                default:
                  i = new oc(s, a, r, u);
              }
              (i.onDestroy = () => o.delete(r.id)), o.set(r.id, i);
            }
            return i;
          }
          ngOnDestroy() {
            this.rendererByCompId.clear();
          }
          begin() {}
          end() {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(T(Ms), T(Po), T(Mo), T(Ly));
          }),
          (e.ɵprov = P({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class rc {
        constructor(t) {
          (this.eventManager = t),
            (this.data = Object.create(null)),
            (this.destroyNode = null);
        }
        destroy() {}
        createElement(t, n) {
          return n
            ? document.createElementNS(ec[n] || n, t)
            : document.createElement(t);
        }
        createComment(t) {
          return document.createComment(t);
        }
        createText(t) {
          return document.createTextNode(t);
        }
        appendChild(t, n) {
          (Vy(t) ? t.content : t).appendChild(n);
        }
        insertBefore(t, n, r) {
          t && (Vy(t) ? t.content : t).insertBefore(n, r);
        }
        removeChild(t, n) {
          t && t.removeChild(n);
        }
        selectRootElement(t, n) {
          let r = "string" == typeof t ? document.querySelector(t) : t;
          if (!r)
            throw new Error(`The selector "${t}" did not match any elements`);
          return n || (r.textContent = ""), r;
        }
        parentNode(t) {
          return t.parentNode;
        }
        nextSibling(t) {
          return t.nextSibling;
        }
        setAttribute(t, n, r, o) {
          if (o) {
            n = o + ":" + n;
            const i = ec[o];
            i ? t.setAttributeNS(i, n, r) : t.setAttribute(n, r);
          } else t.setAttribute(n, r);
        }
        removeAttribute(t, n, r) {
          if (r) {
            const o = ec[r];
            o ? t.removeAttributeNS(o, n) : t.removeAttribute(`${r}:${n}`);
          } else t.removeAttribute(n);
        }
        addClass(t, n) {
          t.classList.add(n);
        }
        removeClass(t, n) {
          t.classList.remove(n);
        }
        setStyle(t, n, r, o) {
          o & (ze.DashCase | ze.Important)
            ? t.style.setProperty(n, r, o & ze.Important ? "important" : "")
            : (t.style[n] = r);
        }
        removeStyle(t, n, r) {
          r & ze.DashCase ? t.style.removeProperty(n) : (t.style[n] = "");
        }
        setProperty(t, n, r) {
          t[n] = r;
        }
        setValue(t, n) {
          t.nodeValue = n;
        }
        listen(t, n, r) {
          return "string" == typeof t
            ? this.eventManager.addGlobalEventListener(t, n, jy(r))
            : this.eventManager.addEventListener(t, n, jy(r));
        }
      }
      function Vy(e) {
        return "TEMPLATE" === e.tagName && void 0 !== e.content;
      }
      class FA extends rc {
        constructor(t, n, r, o) {
          super(t),
            (this.sharedStylesHost = n),
            (this.hostEl = r),
            (this.shadowRoot = r.attachShadow({ mode: "open" })),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const i = ky(o.id, o.styles);
          for (const s of i) {
            const a = document.createElement("style");
            (a.textContent = s), this.shadowRoot.appendChild(a);
          }
        }
        nodeOrShadowRoot(t) {
          return t === this.hostEl ? this.shadowRoot : t;
        }
        appendChild(t, n) {
          return super.appendChild(this.nodeOrShadowRoot(t), n);
        }
        insertBefore(t, n, r) {
          return super.insertBefore(this.nodeOrShadowRoot(t), n, r);
        }
        removeChild(t, n) {
          return super.removeChild(this.nodeOrShadowRoot(t), n);
        }
        parentNode(t) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(t))
          );
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
      }
      class oc extends rc {
        constructor(t, n, r, o, i = r.id) {
          super(t),
            (this.sharedStylesHost = n),
            (this.removeStylesOnCompDestory = o),
            (this.rendererUsageCount = 0),
            (this.styles = ky(i, r.styles));
        }
        applyStyles() {
          this.sharedStylesHost.addStyles(this.styles),
            this.rendererUsageCount++;
        }
        destroy() {
          this.removeStylesOnCompDestory &&
            (this.sharedStylesHost.removeStyles(this.styles),
            this.rendererUsageCount--,
            0 === this.rendererUsageCount && this.onDestroy?.());
        }
      }
      class Uy extends oc {
        constructor(t, n, r, o, i) {
          const s = o + "-" + r.id;
          super(t, n, r, i, s),
            (this.contentAttr = (function NA(e) {
              return "_ngcontent-%COMP%".replace(tc, e);
            })(s)),
            (this.hostAttr = (function PA(e) {
              return "_nghost-%COMP%".replace(tc, e);
            })(s));
        }
        applyToHost(t) {
          this.applyStyles(), this.setAttribute(t, this.hostAttr, "");
        }
        createElement(t, n) {
          const r = super.createElement(t, n);
          return super.setAttribute(r, this.contentAttr, ""), r;
        }
      }
      let LA = (() => {
        class e extends Ny {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return !0;
          }
          addEventListener(n, r, o) {
            return (
              n.addEventListener(r, o, !1),
              () => this.removeEventListener(n, r, o)
            );
          }
          removeEventListener(n, r, o) {
            return n.removeEventListener(r, o);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(T(We));
          }),
          (e.ɵprov = P({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const By = ["alt", "control", "meta", "shift"],
        kA = {
          "\b": "Backspace",
          "\t": "Tab",
          "\x7f": "Delete",
          "\x1b": "Escape",
          Del: "Delete",
          Esc: "Escape",
          Left: "ArrowLeft",
          Right: "ArrowRight",
          Up: "ArrowUp",
          Down: "ArrowDown",
          Menu: "ContextMenu",
          Scroll: "ScrollLock",
          Win: "OS",
        },
        jA = {
          alt: (e) => e.altKey,
          control: (e) => e.ctrlKey,
          meta: (e) => e.metaKey,
          shift: (e) => e.shiftKey,
        };
      let $A = (() => {
        class e extends Ny {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return null != e.parseEventName(n);
          }
          addEventListener(n, r, o) {
            const i = e.parseEventName(r),
              s = e.eventCallback(i.fullKey, o, this.manager.getZone());
            return this.manager
              .getZone()
              .runOutsideAngular(() => On().onAndCancel(n, i.domEventName, s));
          }
          static parseEventName(n) {
            const r = n.toLowerCase().split("."),
              o = r.shift();
            if (0 === r.length || ("keydown" !== o && "keyup" !== o))
              return null;
            const i = e._normalizeKey(r.pop());
            let s = "",
              a = r.indexOf("code");
            if (
              (a > -1 && (r.splice(a, 1), (s = "code.")),
              By.forEach((l) => {
                const c = r.indexOf(l);
                c > -1 && (r.splice(c, 1), (s += l + "."));
              }),
              (s += i),
              0 != r.length || 0 === i.length)
            )
              return null;
            const u = {};
            return (u.domEventName = o), (u.fullKey = s), u;
          }
          static matchEventFullKeyCode(n, r) {
            let o = kA[n.key] || n.key,
              i = "";
            return (
              r.indexOf("code.") > -1 && ((o = n.code), (i = "code.")),
              !(null == o || !o) &&
                ((o = o.toLowerCase()),
                " " === o ? (o = "space") : "." === o && (o = "dot"),
                By.forEach((s) => {
                  s !== o && (0, jA[s])(n) && (i += s + ".");
                }),
                (i += o),
                i === r)
            );
          }
          static eventCallback(n, r, o) {
            return (i) => {
              e.matchEventFullKeyCode(i, n) && o.runGuarded(() => r(i));
            };
          }
          static _normalizeKey(n) {
            return "esc" === n ? "escape" : n;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(T(We));
          }),
          (e.ɵprov = P({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const HA = Um(mM, "browser", [
          { provide: Rm, useValue: "browser" },
          {
            provide: Am,
            useValue: function VA() {
              Jl.makeCurrent();
            },
            multi: !0,
          },
          {
            provide: We,
            useFactory: function BA() {
              return (
                (function u_(e) {
                  iu = e;
                })(document),
                document
              );
            },
            deps: [],
          },
        ]),
        Gy = new A(""),
        Wy = [
          {
            provide: us,
            useClass: class MA {
              addToWindow(t) {
                (oe.getAngularTestability = (r, o = !0) => {
                  const i = t.findTestabilityInTree(r, o);
                  if (null == i)
                    throw new Error("Could not find testability for element.");
                  return i;
                }),
                  (oe.getAllAngularTestabilities = () =>
                    t.getAllTestabilities()),
                  (oe.getAllAngularRootElements = () => t.getAllRootElements()),
                  oe.frameworkStabilizers || (oe.frameworkStabilizers = []),
                  oe.frameworkStabilizers.push((r) => {
                    const o = oe.getAllAngularTestabilities();
                    let i = o.length,
                      s = !1;
                    const a = function (u) {
                      (s = s || u), i--, 0 == i && r(s);
                    };
                    o.forEach(function (u) {
                      u.whenStable(a);
                    });
                  });
              }
              findTestabilityInTree(t, n, r) {
                return null == n
                  ? null
                  : t.getTestability(n) ??
                      (r
                        ? On().isShadowRoot(n)
                          ? this.findTestabilityInTree(t, n.host, !0)
                          : this.findTestabilityInTree(t, n.parentElement, !0)
                        : null);
              }
            },
            deps: [],
          },
          { provide: Lm, useClass: _l, deps: [de, El, us] },
          { provide: _l, useClass: _l, deps: [de, El, us] },
        ],
        qy = [
          { provide: pu, useValue: "root" },
          {
            provide: ar,
            useFactory: function UA() {
              return new ar();
            },
            deps: [],
          },
          { provide: bs, useClass: LA, multi: !0, deps: [We, de, Rm] },
          { provide: bs, useClass: $A, multi: !0, deps: [We] },
          { provide: nc, useClass: nc, deps: [Ms, Po, Mo, Ly] },
          { provide: vh, useExisting: nc },
          { provide: Py, useExisting: Po },
          { provide: Po, useClass: Po, deps: [We] },
          { provide: Ms, useClass: Ms, deps: [bs, de] },
          { provide: class QT {}, useClass: TA, deps: [] },
          [],
        ];
      let zA = (() => {
          class e {
            constructor(n) {}
            static withServerTransition(n) {
              return {
                ngModule: e,
                providers: [
                  { provide: Mo, useValue: n.appId },
                  { provide: xy, useExisting: Mo },
                  bA,
                ],
              };
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(T(Gy, 12));
            }),
            (e.ɵmod = Cn({ type: e })),
            (e.ɵinj = rn({ providers: [...qy, ...Wy], imports: [BT, yM] })),
            e
          );
        })(),
        Zy = (() => {
          class e {
            constructor(n) {
              this._doc = n;
            }
            getTitle() {
              return this._doc.title;
            }
            setTitle(n) {
              this._doc.title = n || "";
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(T(We));
            }),
            (e.ɵprov = P({
              token: e,
              factory: function (n) {
                let r = null;
                return (
                  (r = n
                    ? new n()
                    : (function WA() {
                        return new Zy(T(We));
                      })()),
                  r
                );
              },
              providedIn: "root",
            })),
            e
          );
        })();
      function S(...e) {
        return De(e, $r(e));
      }
      typeof window < "u" && window;
      class Et extends kt {
        constructor(t) {
          super(), (this._value = t);
        }
        get value() {
          return this.getValue();
        }
        _subscribe(t) {
          const n = super._subscribe(t);
          return !n.closed && t.next(this._value), n;
        }
        getValue() {
          const { hasError: t, thrownError: n, _value: r } = this;
          if (t) throw n;
          return this._throwIfClosed(), r;
        }
        next(t) {
          super.next((this._value = t));
        }
      }
      const Ts = Lr(
          (e) =>
            function () {
              e(this),
                (this.name = "EmptyError"),
                (this.message = "no elements in sequence");
            }
        ),
        { isArray: XA } = Array,
        { getPrototypeOf: JA, prototype: eR, keys: tR } = Object;
      const { isArray: oR } = Array;
      function Ky(...e) {
        const t = $r(e),
          n = (function kD(e) {
            return te(na(e)) ? e.pop() : void 0;
          })(e),
          { args: r, keys: o } = (function nR(e) {
            if (1 === e.length) {
              const t = e[0];
              if (XA(t)) return { args: t, keys: null };
              if (
                (function rR(e) {
                  return e && "object" == typeof e && JA(e) === eR;
                })(t)
              ) {
                const n = tR(t);
                return { args: n.map((r) => t[r]), keys: n };
              }
            }
            return { args: e, keys: null };
          })(e);
        if (0 === r.length) return De([], t);
        const i = new ve(
          (function uR(e, t, n = Dn) {
            return (r) => {
              Xy(
                t,
                () => {
                  const { length: o } = e,
                    i = new Array(o);
                  let s = o,
                    a = o;
                  for (let u = 0; u < o; u++)
                    Xy(
                      t,
                      () => {
                        const l = De(e[u], t);
                        let c = !1;
                        l.subscribe(
                          Ie(
                            r,
                            (d) => {
                              (i[u] = d),
                                c || ((c = !0), a--),
                                a || r.next(n(i.slice()));
                            },
                            () => {
                              --s || r.complete();
                            }
                          )
                        );
                      },
                      r
                    );
                },
                r
              );
            };
          })(
            r,
            t,
            o
              ? (s) =>
                  (function aR(e, t) {
                    return e.reduce((n, r, o) => ((n[r] = t[o]), n), {});
                  })(o, s)
              : Dn
          )
        );
        return n
          ? i.pipe(
              (function sR(e) {
                return H((t) =>
                  (function iR(e, t) {
                    return oR(t) ? e(...t) : e(t);
                  })(e, t)
                );
              })(n)
            )
          : i;
      }
      function Xy(e, t, n) {
        e ? jt(n, e, t) : t();
      }
      function ac(...e) {
        return (function lR() {
          return Vn(1);
        })()(De(e, $r(e)));
      }
      function Jy(e) {
        return new ve((t) => {
          ft(e()).subscribe(t);
        });
      }
      function Oo(e, t) {
        const n = te(e) ? e : () => e,
          r = (o) => o.error(n());
        return new ve(t ? (o) => t.schedule(r, 0, o) : r);
      }
      function uc() {
        return Ee((e, t) => {
          let n = null;
          e._refCount++;
          const r = Ie(t, void 0, void 0, void 0, () => {
            if (!e || e._refCount <= 0 || 0 < --e._refCount)
              return void (n = null);
            const o = e._connection,
              i = n;
            (n = null),
              o && (!i || o === i) && o.unsubscribe(),
              t.unsubscribe();
          });
          e.subscribe(r), r.closed || (n = e.connect());
        });
      }
      class ev extends ve {
        constructor(t, n) {
          super(),
            (this.source = t),
            (this.subjectFactory = n),
            (this._subject = null),
            (this._refCount = 0),
            (this._connection = null),
            qc(t) && (this.lift = t.lift);
        }
        _subscribe(t) {
          return this.getSubject().subscribe(t);
        }
        getSubject() {
          const t = this._subject;
          return (
            (!t || t.isStopped) && (this._subject = this.subjectFactory()),
            this._subject
          );
        }
        _teardown() {
          this._refCount = 0;
          const { _connection: t } = this;
          (this._subject = this._connection = null), t?.unsubscribe();
        }
        connect() {
          let t = this._connection;
          if (!t) {
            t = this._connection = new rt();
            const n = this.getSubject();
            t.add(
              this.source.subscribe(
                Ie(
                  n,
                  void 0,
                  () => {
                    this._teardown(), n.complete();
                  },
                  (r) => {
                    this._teardown(), n.error(r);
                  },
                  () => this._teardown()
                )
              )
            ),
              t.closed && ((this._connection = null), (t = rt.EMPTY));
          }
          return t;
        }
        refCount() {
          return uc()(this);
        }
      }
      function Ot(e, t) {
        return Ee((n, r) => {
          let o = null,
            i = 0,
            s = !1;
          const a = () => s && !o && r.complete();
          n.subscribe(
            Ie(
              r,
              (u) => {
                o?.unsubscribe();
                let l = 0;
                const c = i++;
                ft(e(u, c)).subscribe(
                  (o = Ie(
                    r,
                    (d) => r.next(t ? t(u, d, c, l++) : d),
                    () => {
                      (o = null), a();
                    }
                  ))
                );
              },
              () => {
                (s = !0), a();
              }
            )
          );
        });
      }
      function Fo(e) {
        return e <= 0
          ? () => It
          : Ee((t, n) => {
              let r = 0;
              t.subscribe(
                Ie(n, (o) => {
                  ++r <= e && (n.next(o), e <= r && n.complete());
                })
              );
            });
      }
      function dn(e, t) {
        return Ee((n, r) => {
          let o = 0;
          n.subscribe(Ie(r, (i) => e.call(t, i, o++) && r.next(i)));
        });
      }
      function As(e) {
        return Ee((t, n) => {
          let r = !1;
          t.subscribe(
            Ie(
              n,
              (o) => {
                (r = !0), n.next(o);
              },
              () => {
                r || n.next(e), n.complete();
              }
            )
          );
        });
      }
      function tv(e = dR) {
        return Ee((t, n) => {
          let r = !1;
          t.subscribe(
            Ie(
              n,
              (o) => {
                (r = !0), n.next(o);
              },
              () => (r ? n.complete() : n.error(e()))
            )
          );
        });
      }
      function dR() {
        return new Ts();
      }
      function fn(e, t) {
        const n = arguments.length >= 2;
        return (r) =>
          r.pipe(
            e ? dn((o, i) => e(o, i, r)) : Dn,
            Fo(1),
            n ? As(t) : tv(() => new Ts())
          );
      }
      function Ln(e, t) {
        return te(t) ? Se(e, t, 1) : Se(e, 1);
      }
      function Oe(e, t, n) {
        const r = te(e) || t || n ? { next: e, error: t, complete: n } : e;
        return r
          ? Ee((o, i) => {
              var s;
              null === (s = r.subscribe) || void 0 === s || s.call(r);
              let a = !0;
              o.subscribe(
                Ie(
                  i,
                  (u) => {
                    var l;
                    null === (l = r.next) || void 0 === l || l.call(r, u),
                      i.next(u);
                  },
                  () => {
                    var u;
                    (a = !1),
                      null === (u = r.complete) || void 0 === u || u.call(r),
                      i.complete();
                  },
                  (u) => {
                    var l;
                    (a = !1),
                      null === (l = r.error) || void 0 === l || l.call(r, u),
                      i.error(u);
                  },
                  () => {
                    var u, l;
                    a &&
                      (null === (u = r.unsubscribe) ||
                        void 0 === u ||
                        u.call(r)),
                      null === (l = r.finalize) || void 0 === l || l.call(r);
                  }
                )
              );
            })
          : Dn;
      }
      function hn(e) {
        return Ee((t, n) => {
          let i,
            r = null,
            o = !1;
          (r = t.subscribe(
            Ie(n, void 0, void 0, (s) => {
              (i = ft(e(s, hn(e)(t)))),
                r ? (r.unsubscribe(), (r = null), i.subscribe(n)) : (o = !0);
            })
          )),
            o && (r.unsubscribe(), (r = null), i.subscribe(n));
        });
      }
      function nv(e, t) {
        return Ee(
          (function fR(e, t, n, r, o) {
            return (i, s) => {
              let a = n,
                u = t,
                l = 0;
              i.subscribe(
                Ie(
                  s,
                  (c) => {
                    const d = l++;
                    (u = a ? e(u, c, d) : ((a = !0), c)), r && s.next(u);
                  },
                  o &&
                    (() => {
                      a && s.next(u), s.complete();
                    })
                )
              );
            };
          })(e, t, arguments.length >= 2, !0)
        );
      }
      function lc(e) {
        return e <= 0
          ? () => It
          : Ee((t, n) => {
              let r = [];
              t.subscribe(
                Ie(
                  n,
                  (o) => {
                    r.push(o), e < r.length && r.shift();
                  },
                  () => {
                    for (const o of r) n.next(o);
                    n.complete();
                  },
                  void 0,
                  () => {
                    r = null;
                  }
                )
              );
            });
      }
      function rv(e, t) {
        const n = arguments.length >= 2;
        return (r) =>
          r.pipe(
            e ? dn((o, i) => e(o, i, r)) : Dn,
            lc(1),
            n ? As(t) : tv(() => new Ts())
          );
      }
      function cc(e) {
        return Ee((t, n) => {
          try {
            t.subscribe(n);
          } finally {
            n.add(e);
          }
        });
      }
      const k = "primary",
        Lo = Symbol("RouteTitle");
      class gR {
        constructor(t) {
          this.params = t || {};
        }
        has(t) {
          return Object.prototype.hasOwnProperty.call(this.params, t);
        }
        get(t) {
          if (this.has(t)) {
            const n = this.params[t];
            return Array.isArray(n) ? n[0] : n;
          }
          return null;
        }
        getAll(t) {
          if (this.has(t)) {
            const n = this.params[t];
            return Array.isArray(n) ? n : [n];
          }
          return [];
        }
        get keys() {
          return Object.keys(this.params);
        }
      }
      function br(e) {
        return new gR(e);
      }
      function mR(e, t, n) {
        const r = n.path.split("/");
        if (
          r.length > e.length ||
          ("full" === n.pathMatch && (t.hasChildren() || r.length < e.length))
        )
          return null;
        const o = {};
        for (let i = 0; i < r.length; i++) {
          const s = r[i],
            a = e[i];
          if (s.startsWith(":")) o[s.substring(1)] = a;
          else if (s !== a.path) return null;
        }
        return { consumed: e.slice(0, r.length), posParams: o };
      }
      function Ft(e, t) {
        const n = e ? Object.keys(e) : void 0,
          r = t ? Object.keys(t) : void 0;
        if (!n || !r || n.length != r.length) return !1;
        let o;
        for (let i = 0; i < n.length; i++)
          if (((o = n[i]), !ov(e[o], t[o]))) return !1;
        return !0;
      }
      function ov(e, t) {
        if (Array.isArray(e) && Array.isArray(t)) {
          if (e.length !== t.length) return !1;
          const n = [...e].sort(),
            r = [...t].sort();
          return n.every((o, i) => r[i] === o);
        }
        return e === t;
      }
      function iv(e) {
        return Array.prototype.concat.apply([], e);
      }
      function sv(e) {
        return e.length > 0 ? e[e.length - 1] : null;
      }
      function Te(e, t) {
        for (const n in e) e.hasOwnProperty(n) && t(e[n], n);
      }
      function pn(e) {
        return yp(e) ? e : Qi(e) ? De(Promise.resolve(e)) : S(e);
      }
      const Rs = !1,
        vR = {
          exact: function lv(e, t, n) {
            if (
              !kn(e.segments, t.segments) ||
              !xs(e.segments, t.segments, n) ||
              e.numberOfChildren !== t.numberOfChildren
            )
              return !1;
            for (const r in t.children)
              if (!e.children[r] || !lv(e.children[r], t.children[r], n))
                return !1;
            return !0;
          },
          subset: cv,
        },
        av = {
          exact: function DR(e, t) {
            return Ft(e, t);
          },
          subset: function wR(e, t) {
            return (
              Object.keys(t).length <= Object.keys(e).length &&
              Object.keys(t).every((n) => ov(e[n], t[n]))
            );
          },
          ignored: () => !0,
        };
      function uv(e, t, n) {
        return (
          vR[n.paths](e.root, t.root, n.matrixParams) &&
          av[n.queryParams](e.queryParams, t.queryParams) &&
          !("exact" === n.fragment && e.fragment !== t.fragment)
        );
      }
      function cv(e, t, n) {
        return dv(e, t, t.segments, n);
      }
      function dv(e, t, n, r) {
        if (e.segments.length > n.length) {
          const o = e.segments.slice(0, n.length);
          return !(!kn(o, n) || t.hasChildren() || !xs(o, n, r));
        }
        if (e.segments.length === n.length) {
          if (!kn(e.segments, n) || !xs(e.segments, n, r)) return !1;
          for (const o in t.children)
            if (!e.children[o] || !cv(e.children[o], t.children[o], r))
              return !1;
          return !0;
        }
        {
          const o = n.slice(0, e.segments.length),
            i = n.slice(e.segments.length);
          return (
            !!(kn(e.segments, o) && xs(e.segments, o, r) && e.children[k]) &&
            dv(e.children[k], t, i, r)
          );
        }
      }
      function xs(e, t, n) {
        return t.every((r, o) => av[n](e[o].parameters, r.parameters));
      }
      class gn {
        constructor(t = new U([], {}), n = {}, r = null) {
          (this.root = t), (this.queryParams = n), (this.fragment = r);
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = br(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return ER.serialize(this);
        }
      }
      class U {
        constructor(t, n) {
          (this.segments = t),
            (this.children = n),
            (this.parent = null),
            Te(n, (r, o) => (r.parent = this));
        }
        hasChildren() {
          return this.numberOfChildren > 0;
        }
        get numberOfChildren() {
          return Object.keys(this.children).length;
        }
        toString() {
          return Ns(this);
        }
      }
      class ko {
        constructor(t, n) {
          (this.path = t), (this.parameters = n);
        }
        get parameterMap() {
          return (
            this._parameterMap || (this._parameterMap = br(this.parameters)),
            this._parameterMap
          );
        }
        toString() {
          return pv(this);
        }
      }
      function kn(e, t) {
        return e.length === t.length && e.every((n, r) => n.path === t[r].path);
      }
      let jo = (() => {
        class e {}
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = P({
            token: e,
            factory: function () {
              return new dc();
            },
            providedIn: "root",
          })),
          e
        );
      })();
      class dc {
        parse(t) {
          const n = new NR(t);
          return new gn(
            n.parseRootSegment(),
            n.parseQueryParams(),
            n.parseFragment()
          );
        }
        serialize(t) {
          const n = `/${$o(t.root, !0)}`,
            r = (function bR(e) {
              const t = Object.keys(e)
                .map((n) => {
                  const r = e[n];
                  return Array.isArray(r)
                    ? r.map((o) => `${Ps(n)}=${Ps(o)}`).join("&")
                    : `${Ps(n)}=${Ps(r)}`;
                })
                .filter((n) => !!n);
              return t.length ? `?${t.join("&")}` : "";
            })(t.queryParams);
          return `${n}${r}${
            "string" == typeof t.fragment
              ? `#${(function IR(e) {
                  return encodeURI(e);
                })(t.fragment)}`
              : ""
          }`;
        }
      }
      const ER = new dc();
      function Ns(e) {
        return e.segments.map((t) => pv(t)).join("/");
      }
      function $o(e, t) {
        if (!e.hasChildren()) return Ns(e);
        if (t) {
          const n = e.children[k] ? $o(e.children[k], !1) : "",
            r = [];
          return (
            Te(e.children, (o, i) => {
              i !== k && r.push(`${i}:${$o(o, !1)}`);
            }),
            r.length > 0 ? `${n}(${r.join("//")})` : n
          );
        }
        {
          const n = (function _R(e, t) {
            let n = [];
            return (
              Te(e.children, (r, o) => {
                o === k && (n = n.concat(t(r, o)));
              }),
              Te(e.children, (r, o) => {
                o !== k && (n = n.concat(t(r, o)));
              }),
              n
            );
          })(e, (r, o) =>
            o === k ? [$o(e.children[k], !1)] : [`${o}:${$o(r, !1)}`]
          );
          return 1 === Object.keys(e.children).length && null != e.children[k]
            ? `${Ns(e)}/${n[0]}`
            : `${Ns(e)}/(${n.join("//")})`;
        }
      }
      function fv(e) {
        return encodeURIComponent(e)
          .replace(/%40/g, "@")
          .replace(/%3A/gi, ":")
          .replace(/%24/g, "$")
          .replace(/%2C/gi, ",");
      }
      function Ps(e) {
        return fv(e).replace(/%3B/gi, ";");
      }
      function fc(e) {
        return fv(e)
          .replace(/\(/g, "%28")
          .replace(/\)/g, "%29")
          .replace(/%26/gi, "&");
      }
      function Os(e) {
        return decodeURIComponent(e);
      }
      function hv(e) {
        return Os(e.replace(/\+/g, "%20"));
      }
      function pv(e) {
        return `${fc(e.path)}${(function SR(e) {
          return Object.keys(e)
            .map((t) => `;${fc(t)}=${fc(e[t])}`)
            .join("");
        })(e.parameters)}`;
      }
      const MR = /^[^\/()?;=#]+/;
      function Fs(e) {
        const t = e.match(MR);
        return t ? t[0] : "";
      }
      const TR = /^[^=?&#]+/,
        RR = /^[^&#]+/;
      class NR {
        constructor(t) {
          (this.url = t), (this.remaining = t);
        }
        parseRootSegment() {
          return (
            this.consumeOptional("/"),
            "" === this.remaining ||
            this.peekStartsWith("?") ||
            this.peekStartsWith("#")
              ? new U([], {})
              : new U([], this.parseChildren())
          );
        }
        parseQueryParams() {
          const t = {};
          if (this.consumeOptional("?"))
            do {
              this.parseQueryParam(t);
            } while (this.consumeOptional("&"));
          return t;
        }
        parseFragment() {
          return this.consumeOptional("#")
            ? decodeURIComponent(this.remaining)
            : null;
        }
        parseChildren() {
          if ("" === this.remaining) return {};
          this.consumeOptional("/");
          const t = [];
          for (
            this.peekStartsWith("(") || t.push(this.parseSegment());
            this.peekStartsWith("/") &&
            !this.peekStartsWith("//") &&
            !this.peekStartsWith("/(");

          )
            this.capture("/"), t.push(this.parseSegment());
          let n = {};
          this.peekStartsWith("/(") &&
            (this.capture("/"), (n = this.parseParens(!0)));
          let r = {};
          return (
            this.peekStartsWith("(") && (r = this.parseParens(!1)),
            (t.length > 0 || Object.keys(n).length > 0) && (r[k] = new U(t, n)),
            r
          );
        }
        parseSegment() {
          const t = Fs(this.remaining);
          if ("" === t && this.peekStartsWith(";")) throw new w(4009, Rs);
          return this.capture(t), new ko(Os(t), this.parseMatrixParams());
        }
        parseMatrixParams() {
          const t = {};
          for (; this.consumeOptional(";"); ) this.parseParam(t);
          return t;
        }
        parseParam(t) {
          const n = Fs(this.remaining);
          if (!n) return;
          this.capture(n);
          let r = "";
          if (this.consumeOptional("=")) {
            const o = Fs(this.remaining);
            o && ((r = o), this.capture(r));
          }
          t[Os(n)] = Os(r);
        }
        parseQueryParam(t) {
          const n = (function AR(e) {
            const t = e.match(TR);
            return t ? t[0] : "";
          })(this.remaining);
          if (!n) return;
          this.capture(n);
          let r = "";
          if (this.consumeOptional("=")) {
            const s = (function xR(e) {
              const t = e.match(RR);
              return t ? t[0] : "";
            })(this.remaining);
            s && ((r = s), this.capture(r));
          }
          const o = hv(n),
            i = hv(r);
          if (t.hasOwnProperty(o)) {
            let s = t[o];
            Array.isArray(s) || ((s = [s]), (t[o] = s)), s.push(i);
          } else t[o] = i;
        }
        parseParens(t) {
          const n = {};
          for (
            this.capture("(");
            !this.consumeOptional(")") && this.remaining.length > 0;

          ) {
            const r = Fs(this.remaining),
              o = this.remaining[r.length];
            if ("/" !== o && ")" !== o && ";" !== o) throw new w(4010, Rs);
            let i;
            r.indexOf(":") > -1
              ? ((i = r.slice(0, r.indexOf(":"))),
                this.capture(i),
                this.capture(":"))
              : t && (i = k);
            const s = this.parseChildren();
            (n[i] = 1 === Object.keys(s).length ? s[k] : new U([], s)),
              this.consumeOptional("//");
          }
          return n;
        }
        peekStartsWith(t) {
          return this.remaining.startsWith(t);
        }
        consumeOptional(t) {
          return (
            !!this.peekStartsWith(t) &&
            ((this.remaining = this.remaining.substring(t.length)), !0)
          );
        }
        capture(t) {
          if (!this.consumeOptional(t)) throw new w(4011, Rs);
        }
      }
      function hc(e) {
        return e.segments.length > 0 ? new U([], { [k]: e }) : e;
      }
      function Ls(e) {
        const t = {};
        for (const r of Object.keys(e.children)) {
          const i = Ls(e.children[r]);
          (i.segments.length > 0 || i.hasChildren()) && (t[r] = i);
        }
        return (function PR(e) {
          if (1 === e.numberOfChildren && e.children[k]) {
            const t = e.children[k];
            return new U(e.segments.concat(t.segments), t.children);
          }
          return e;
        })(new U(e.segments, t));
      }
      function jn(e) {
        return e instanceof gn;
      }
      const pc = !1;
      function OR(e, t, n, r, o) {
        if (0 === n.length) return Mr(t.root, t.root, t.root, r, o);
        const i = (function Dv(e) {
          if ("string" == typeof e[0] && 1 === e.length && "/" === e[0])
            return new vv(!0, 0, e);
          let t = 0,
            n = !1;
          const r = e.reduce((o, i, s) => {
            if ("object" == typeof i && null != i) {
              if (i.outlets) {
                const a = {};
                return (
                  Te(i.outlets, (u, l) => {
                    a[l] = "string" == typeof u ? u.split("/") : u;
                  }),
                  [...o, { outlets: a }]
                );
              }
              if (i.segmentPath) return [...o, i.segmentPath];
            }
            return "string" != typeof i
              ? [...o, i]
              : 0 === s
              ? (i.split("/").forEach((a, u) => {
                  (0 == u && "." === a) ||
                    (0 == u && "" === a
                      ? (n = !0)
                      : ".." === a
                      ? t++
                      : "" != a && o.push(a));
                }),
                o)
              : [...o, i];
          }, []);
          return new vv(n, t, r);
        })(n);
        return i.toRoot()
          ? Mr(t.root, t.root, new U([], {}), r, o)
          : (function s(u) {
              const l = (function LR(e, t, n, r) {
                  if (e.isAbsolute) return new Tr(t.root, !0, 0);
                  if (-1 === r) return new Tr(n, n === t.root, 0);
                  return (function wv(e, t, n) {
                    let r = e,
                      o = t,
                      i = n;
                    for (; i > o; ) {
                      if (((i -= o), (r = r.parent), !r))
                        throw new w(4005, pc && "Invalid number of '../'");
                      o = r.segments.length;
                    }
                    return new Tr(r, !1, o - i);
                  })(n, r + (Vo(e.commands[0]) ? 0 : 1), e.numberOfDoubleDots);
                })(i, t, e.snapshot?._urlSegment, u),
                c = l.processChildren
                  ? Ar(l.segmentGroup, l.index, i.commands)
                  : gc(l.segmentGroup, l.index, i.commands);
              return Mr(t.root, l.segmentGroup, c, r, o);
            })(e.snapshot?._lastPathIndex);
      }
      function Vo(e) {
        return (
          "object" == typeof e && null != e && !e.outlets && !e.segmentPath
        );
      }
      function Uo(e) {
        return "object" == typeof e && null != e && e.outlets;
      }
      function Mr(e, t, n, r, o) {
        let s,
          i = {};
        r &&
          Te(r, (u, l) => {
            i[l] = Array.isArray(u) ? u.map((c) => `${c}`) : `${u}`;
          }),
          (s = e === t ? n : yv(e, t, n));
        const a = hc(Ls(s));
        return new gn(a, i, o);
      }
      function yv(e, t, n) {
        const r = {};
        return (
          Te(e.children, (o, i) => {
            r[i] = o === t ? n : yv(o, t, n);
          }),
          new U(e.segments, r)
        );
      }
      class vv {
        constructor(t, n, r) {
          if (
            ((this.isAbsolute = t),
            (this.numberOfDoubleDots = n),
            (this.commands = r),
            t && r.length > 0 && Vo(r[0]))
          )
            throw new w(
              4003,
              pc && "Root segment cannot have matrix parameters"
            );
          const o = r.find(Uo);
          if (o && o !== sv(r))
            throw new w(4004, pc && "{outlets:{}} has to be the last command");
        }
        toRoot() {
          return (
            this.isAbsolute &&
            1 === this.commands.length &&
            "/" == this.commands[0]
          );
        }
      }
      class Tr {
        constructor(t, n, r) {
          (this.segmentGroup = t), (this.processChildren = n), (this.index = r);
        }
      }
      function gc(e, t, n) {
        if (
          (e || (e = new U([], {})), 0 === e.segments.length && e.hasChildren())
        )
          return Ar(e, t, n);
        const r = (function jR(e, t, n) {
            let r = 0,
              o = t;
            const i = { match: !1, pathIndex: 0, commandIndex: 0 };
            for (; o < e.segments.length; ) {
              if (r >= n.length) return i;
              const s = e.segments[o],
                a = n[r];
              if (Uo(a)) break;
              const u = `${a}`,
                l = r < n.length - 1 ? n[r + 1] : null;
              if (o > 0 && void 0 === u) break;
              if (u && l && "object" == typeof l && void 0 === l.outlets) {
                if (!_v(u, l, s)) return i;
                r += 2;
              } else {
                if (!_v(u, {}, s)) return i;
                r++;
              }
              o++;
            }
            return { match: !0, pathIndex: o, commandIndex: r };
          })(e, t, n),
          o = n.slice(r.commandIndex);
        if (r.match && r.pathIndex < e.segments.length) {
          const i = new U(e.segments.slice(0, r.pathIndex), {});
          return (
            (i.children[k] = new U(e.segments.slice(r.pathIndex), e.children)),
            Ar(i, 0, o)
          );
        }
        return r.match && 0 === o.length
          ? new U(e.segments, {})
          : r.match && !e.hasChildren()
          ? mc(e, t, n)
          : r.match
          ? Ar(e, 0, o)
          : mc(e, t, n);
      }
      function Ar(e, t, n) {
        if (0 === n.length) return new U(e.segments, {});
        {
          const r = (function kR(e) {
              return Uo(e[0]) ? e[0].outlets : { [k]: e };
            })(n),
            o = {};
          return !r[k] &&
            e.children[k] &&
            1 === e.numberOfChildren &&
            0 === e.children[k].segments.length
            ? Ar(e.children[k], t, n)
            : (Te(r, (i, s) => {
                "string" == typeof i && (i = [i]),
                  null !== i && (o[s] = gc(e.children[s], t, i));
              }),
              Te(e.children, (i, s) => {
                void 0 === r[s] && (o[s] = i);
              }),
              new U(e.segments, o));
        }
      }
      function mc(e, t, n) {
        const r = e.segments.slice(0, t);
        let o = 0;
        for (; o < n.length; ) {
          const i = n[o];
          if (Uo(i)) {
            const u = $R(i.outlets);
            return new U(r, u);
          }
          if (0 === o && Vo(n[0])) {
            r.push(new ko(e.segments[t].path, Cv(n[0]))), o++;
            continue;
          }
          const s = Uo(i) ? i.outlets[k] : `${i}`,
            a = o < n.length - 1 ? n[o + 1] : null;
          s && a && Vo(a)
            ? (r.push(new ko(s, Cv(a))), (o += 2))
            : (r.push(new ko(s, {})), o++);
        }
        return new U(r, {});
      }
      function $R(e) {
        const t = {};
        return (
          Te(e, (n, r) => {
            "string" == typeof n && (n = [n]),
              null !== n && (t[r] = mc(new U([], {}), 0, n));
          }),
          t
        );
      }
      function Cv(e) {
        const t = {};
        return Te(e, (n, r) => (t[r] = `${n}`)), t;
      }
      function _v(e, t, n) {
        return e == n.path && Ft(t, n.parameters);
      }
      const Bo = "imperative";
      class Lt {
        constructor(t, n) {
          (this.id = t), (this.url = n);
        }
      }
      class yc extends Lt {
        constructor(t, n, r = "imperative", o = null) {
          super(t, n),
            (this.type = 0),
            (this.navigationTrigger = r),
            (this.restoredState = o);
        }
        toString() {
          return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class $n extends Lt {
        constructor(t, n, r) {
          super(t, n), (this.urlAfterRedirects = r), (this.type = 1);
        }
        toString() {
          return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
        }
      }
      class ks extends Lt {
        constructor(t, n, r, o) {
          super(t, n), (this.reason = r), (this.code = o), (this.type = 2);
        }
        toString() {
          return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class js extends Lt {
        constructor(t, n, r, o) {
          super(t, n), (this.reason = r), (this.code = o), (this.type = 16);
        }
      }
      class vc extends Lt {
        constructor(t, n, r, o) {
          super(t, n), (this.error = r), (this.target = o), (this.type = 3);
        }
        toString() {
          return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
        }
      }
      class VR extends Lt {
        constructor(t, n, r, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 4);
        }
        toString() {
          return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class UR extends Lt {
        constructor(t, n, r, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 7);
        }
        toString() {
          return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class BR extends Lt {
        constructor(t, n, r, o, i) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.shouldActivate = i),
            (this.type = 8);
        }
        toString() {
          return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
        }
      }
      class HR extends Lt {
        constructor(t, n, r, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 5);
        }
        toString() {
          return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class zR extends Lt {
        constructor(t, n, r, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 6);
        }
        toString() {
          return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class GR {
        constructor(t) {
          (this.route = t), (this.type = 9);
        }
        toString() {
          return `RouteConfigLoadStart(path: ${this.route.path})`;
        }
      }
      class WR {
        constructor(t) {
          (this.route = t), (this.type = 10);
        }
        toString() {
          return `RouteConfigLoadEnd(path: ${this.route.path})`;
        }
      }
      class qR {
        constructor(t) {
          (this.snapshot = t), (this.type = 11);
        }
        toString() {
          return `ChildActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class ZR {
        constructor(t) {
          (this.snapshot = t), (this.type = 12);
        }
        toString() {
          return `ChildActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class QR {
        constructor(t) {
          (this.snapshot = t), (this.type = 13);
        }
        toString() {
          return `ActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class YR {
        constructor(t) {
          (this.snapshot = t), (this.type = 14);
        }
        toString() {
          return `ActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class Ev {
        constructor(t, n, r) {
          (this.routerEvent = t),
            (this.position = n),
            (this.anchor = r),
            (this.type = 15);
        }
        toString() {
          return `Scroll(anchor: '${this.anchor}', position: '${
            this.position ? `${this.position[0]}, ${this.position[1]}` : null
          }')`;
        }
      }
      let JR = (() => {
          class e {
            createUrlTree(n, r, o, i, s, a) {
              return OR(n || r.root, o, i, s, a);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = P({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        tx = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = P({
              token: e,
              factory: function (t) {
                return JR.ɵfac(t);
              },
              providedIn: "root",
            })),
            e
          );
        })();
      class Iv {
        constructor(t) {
          this._root = t;
        }
        get root() {
          return this._root.value;
        }
        parent(t) {
          const n = this.pathFromRoot(t);
          return n.length > 1 ? n[n.length - 2] : null;
        }
        children(t) {
          const n = Dc(t, this._root);
          return n ? n.children.map((r) => r.value) : [];
        }
        firstChild(t) {
          const n = Dc(t, this._root);
          return n && n.children.length > 0 ? n.children[0].value : null;
        }
        siblings(t) {
          const n = wc(t, this._root);
          return n.length < 2
            ? []
            : n[n.length - 2].children
                .map((o) => o.value)
                .filter((o) => o !== t);
        }
        pathFromRoot(t) {
          return wc(t, this._root).map((n) => n.value);
        }
      }
      function Dc(e, t) {
        if (e === t.value) return t;
        for (const n of t.children) {
          const r = Dc(e, n);
          if (r) return r;
        }
        return null;
      }
      function wc(e, t) {
        if (e === t.value) return [t];
        for (const n of t.children) {
          const r = wc(e, n);
          if (r.length) return r.unshift(t), r;
        }
        return [];
      }
      class tn {
        constructor(t, n) {
          (this.value = t), (this.children = n);
        }
        toString() {
          return `TreeNode(${this.value})`;
        }
      }
      function Rr(e) {
        const t = {};
        return e && e.children.forEach((n) => (t[n.value.outlet] = n)), t;
      }
      class Sv extends Iv {
        constructor(t, n) {
          super(t), (this.snapshot = n), Cc(this, t);
        }
        toString() {
          return this.snapshot.toString();
        }
      }
      function bv(e, t) {
        const n = (function nx(e, t) {
            const s = new $s([], {}, {}, "", {}, k, t, null, e.root, -1, {});
            return new Tv("", new tn(s, []));
          })(e, t),
          r = new Et([new ko("", {})]),
          o = new Et({}),
          i = new Et({}),
          s = new Et({}),
          a = new Et(""),
          u = new xr(r, o, s, a, i, k, t, n.root);
        return (u.snapshot = n.root), new Sv(new tn(u, []), n);
      }
      class xr {
        constructor(t, n, r, o, i, s, a, u) {
          (this.url = t),
            (this.params = n),
            (this.queryParams = r),
            (this.fragment = o),
            (this.data = i),
            (this.outlet = s),
            (this.component = a),
            (this.title = this.data?.pipe(H((l) => l[Lo])) ?? S(void 0)),
            (this._futureSnapshot = u);
        }
        get routeConfig() {
          return this._futureSnapshot.routeConfig;
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap ||
              (this._paramMap = this.params.pipe(H((t) => br(t)))),
            this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap ||
              (this._queryParamMap = this.queryParams.pipe(H((t) => br(t)))),
            this._queryParamMap
          );
        }
        toString() {
          return this.snapshot
            ? this.snapshot.toString()
            : `Future(${this._futureSnapshot})`;
        }
      }
      function Mv(e, t = "emptyOnly") {
        const n = e.pathFromRoot;
        let r = 0;
        if ("always" !== t)
          for (r = n.length - 1; r >= 1; ) {
            const o = n[r],
              i = n[r - 1];
            if (o.routeConfig && "" === o.routeConfig.path) r--;
            else {
              if (i.component) break;
              r--;
            }
          }
        return (function rx(e) {
          return e.reduce(
            (t, n) => ({
              params: { ...t.params, ...n.params },
              data: { ...t.data, ...n.data },
              resolve: {
                ...n.data,
                ...t.resolve,
                ...n.routeConfig?.data,
                ...n._resolvedData,
              },
            }),
            { params: {}, data: {}, resolve: {} }
          );
        })(n.slice(r));
      }
      class $s {
        get title() {
          return this.data?.[Lo];
        }
        constructor(t, n, r, o, i, s, a, u, l, c, d) {
          (this.url = t),
            (this.params = n),
            (this.queryParams = r),
            (this.fragment = o),
            (this.data = i),
            (this.outlet = s),
            (this.component = a),
            (this.routeConfig = u),
            (this._urlSegment = l),
            (this._lastPathIndex = c),
            (this._resolve = d);
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap || (this._paramMap = br(this.params)), this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = br(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return `Route(url:'${this.url
            .map((r) => r.toString())
            .join("/")}', path:'${
            this.routeConfig ? this.routeConfig.path : ""
          }')`;
        }
      }
      class Tv extends Iv {
        constructor(t, n) {
          super(n), (this.url = t), Cc(this, n);
        }
        toString() {
          return Av(this._root);
        }
      }
      function Cc(e, t) {
        (t.value._routerState = e), t.children.forEach((n) => Cc(e, n));
      }
      function Av(e) {
        const t =
          e.children.length > 0 ? ` { ${e.children.map(Av).join(", ")} } ` : "";
        return `${e.value}${t}`;
      }
      function _c(e) {
        if (e.snapshot) {
          const t = e.snapshot,
            n = e._futureSnapshot;
          (e.snapshot = n),
            Ft(t.queryParams, n.queryParams) ||
              e.queryParams.next(n.queryParams),
            t.fragment !== n.fragment && e.fragment.next(n.fragment),
            Ft(t.params, n.params) || e.params.next(n.params),
            (function yR(e, t) {
              if (e.length !== t.length) return !1;
              for (let n = 0; n < e.length; ++n) if (!Ft(e[n], t[n])) return !1;
              return !0;
            })(t.url, n.url) || e.url.next(n.url),
            Ft(t.data, n.data) || e.data.next(n.data);
        } else
          (e.snapshot = e._futureSnapshot), e.data.next(e._futureSnapshot.data);
      }
      function Ec(e, t) {
        const n =
          Ft(e.params, t.params) &&
          (function CR(e, t) {
            return (
              kn(e, t) && e.every((n, r) => Ft(n.parameters, t[r].parameters))
            );
          })(e.url, t.url);
        return (
          n &&
          !(!e.parent != !t.parent) &&
          (!e.parent || Ec(e.parent, t.parent))
        );
      }
      function Ho(e, t, n) {
        if (n && e.shouldReuseRoute(t.value, n.value.snapshot)) {
          const r = n.value;
          r._futureSnapshot = t.value;
          const o = (function ix(e, t, n) {
            return t.children.map((r) => {
              for (const o of n.children)
                if (e.shouldReuseRoute(r.value, o.value.snapshot))
                  return Ho(e, r, o);
              return Ho(e, r);
            });
          })(e, t, n);
          return new tn(r, o);
        }
        {
          if (e.shouldAttach(t.value)) {
            const i = e.retrieve(t.value);
            if (null !== i) {
              const s = i.route;
              return (
                (s.value._futureSnapshot = t.value),
                (s.children = t.children.map((a) => Ho(e, a))),
                s
              );
            }
          }
          const r = (function sx(e) {
              return new xr(
                new Et(e.url),
                new Et(e.params),
                new Et(e.queryParams),
                new Et(e.fragment),
                new Et(e.data),
                e.outlet,
                e.component,
                e
              );
            })(t.value),
            o = t.children.map((i) => Ho(e, i));
          return new tn(r, o);
        }
      }
      const Ic = "ngNavigationCancelingError";
      function Rv(e, t) {
        const { redirectTo: n, navigationBehaviorOptions: r } = jn(t)
            ? { redirectTo: t, navigationBehaviorOptions: void 0 }
            : t,
          o = xv(!1, 0, t);
        return (o.url = n), (o.navigationBehaviorOptions = r), o;
      }
      function xv(e, t, n) {
        const r = new Error("NavigationCancelingError: " + (e || ""));
        return (r[Ic] = !0), (r.cancellationCode = t), n && (r.url = n), r;
      }
      function Nv(e) {
        return Pv(e) && jn(e.url);
      }
      function Pv(e) {
        return e && e[Ic];
      }
      class ax {
        constructor() {
          (this.outlet = null),
            (this.route = null),
            (this.resolver = null),
            (this.injector = null),
            (this.children = new zo()),
            (this.attachRef = null);
        }
      }
      let zo = (() => {
        class e {
          constructor() {
            this.contexts = new Map();
          }
          onChildOutletCreated(n, r) {
            const o = this.getOrCreateContext(n);
            (o.outlet = r), this.contexts.set(n, o);
          }
          onChildOutletDestroyed(n) {
            const r = this.getContext(n);
            r && ((r.outlet = null), (r.attachRef = null));
          }
          onOutletDeactivated() {
            const n = this.contexts;
            return (this.contexts = new Map()), n;
          }
          onOutletReAttached(n) {
            this.contexts = n;
          }
          getOrCreateContext(n) {
            let r = this.getContext(n);
            return r || ((r = new ax()), this.contexts.set(n, r)), r;
          }
          getContext(n) {
            return this.contexts.get(n) || null;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = P({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const Vs = !1;
      let Sc = (() => {
        class e {
          constructor() {
            (this.activated = null),
              (this._activatedRoute = null),
              (this.name = k),
              (this.activateEvents = new Ve()),
              (this.deactivateEvents = new Ve()),
              (this.attachEvents = new Ve()),
              (this.detachEvents = new Ve()),
              (this.parentContexts = z(zo)),
              (this.location = z(Dt)),
              (this.changeDetector = z(Ml)),
              (this.environmentInjector = z(Wt));
          }
          ngOnChanges(n) {
            if (n.name) {
              const { firstChange: r, previousValue: o } = n.name;
              if (r) return;
              this.isTrackedInParentContexts(o) &&
                (this.deactivate(),
                this.parentContexts.onChildOutletDestroyed(o)),
                this.initializeOutletWithName();
            }
          }
          ngOnDestroy() {
            this.isTrackedInParentContexts(this.name) &&
              this.parentContexts.onChildOutletDestroyed(this.name);
          }
          isTrackedInParentContexts(n) {
            return this.parentContexts.getContext(n)?.outlet === this;
          }
          ngOnInit() {
            this.initializeOutletWithName();
          }
          initializeOutletWithName() {
            if (
              (this.parentContexts.onChildOutletCreated(this.name, this),
              this.activated)
            )
              return;
            const n = this.parentContexts.getContext(this.name);
            n?.route &&
              (n.attachRef
                ? this.attach(n.attachRef, n.route)
                : this.activateWith(n.route, n.injector));
          }
          get isActivated() {
            return !!this.activated;
          }
          get component() {
            if (!this.activated) throw new w(4012, Vs);
            return this.activated.instance;
          }
          get activatedRoute() {
            if (!this.activated) throw new w(4012, Vs);
            return this._activatedRoute;
          }
          get activatedRouteData() {
            return this._activatedRoute
              ? this._activatedRoute.snapshot.data
              : {};
          }
          detach() {
            if (!this.activated) throw new w(4012, Vs);
            this.location.detach();
            const n = this.activated;
            return (
              (this.activated = null),
              (this._activatedRoute = null),
              this.detachEvents.emit(n.instance),
              n
            );
          }
          attach(n, r) {
            (this.activated = n),
              (this._activatedRoute = r),
              this.location.insert(n.hostView),
              this.attachEvents.emit(n.instance);
          }
          deactivate() {
            if (this.activated) {
              const n = this.component;
              this.activated.destroy(),
                (this.activated = null),
                (this._activatedRoute = null),
                this.deactivateEvents.emit(n);
            }
          }
          activateWith(n, r) {
            if (this.isActivated) throw new w(4013, Vs);
            this._activatedRoute = n;
            const o = this.location,
              s = n.snapshot.component,
              a = this.parentContexts.getOrCreateContext(this.name).children,
              u = new ux(n, a, o.injector);
            if (
              r &&
              (function lx(e) {
                return !!e.resolveComponentFactory;
              })(r)
            ) {
              const l = r.resolveComponentFactory(s);
              this.activated = o.createComponent(l, o.length, u);
            } else
              this.activated = o.createComponent(s, {
                index: o.length,
                injector: u,
                environmentInjector: r ?? this.environmentInjector,
              });
            this.changeDetector.markForCheck(),
              this.activateEvents.emit(this.activated.instance);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵdir = Fe({
            type: e,
            selectors: [["router-outlet"]],
            inputs: { name: "name" },
            outputs: {
              activateEvents: "activate",
              deactivateEvents: "deactivate",
              attachEvents: "attach",
              detachEvents: "detach",
            },
            exportAs: ["outlet"],
            standalone: !0,
            features: [In],
          })),
          e
        );
      })();
      class ux {
        constructor(t, n, r) {
          (this.route = t), (this.childContexts = n), (this.parent = r);
        }
        get(t, n) {
          return t === xr
            ? this.route
            : t === zo
            ? this.childContexts
            : this.parent.get(t, n);
        }
      }
      let bc = (() => {
        class e {}
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵcmp = zr({
            type: e,
            selectors: [["ng-component"]],
            standalone: !0,
            features: [Bg],
            decls: 1,
            vars: 0,
            template: function (n, r) {
              1 & n && yo(0, "router-outlet");
            },
            dependencies: [Sc],
            encapsulation: 2,
          })),
          e
        );
      })();
      function Ov(e, t) {
        return (
          e.providers &&
            !e._injector &&
            (e._injector = ns(e.providers, t, `Route: ${e.path}`)),
          e._injector ?? t
        );
      }
      function Tc(e) {
        const t = e.children && e.children.map(Tc),
          n = t ? { ...e, children: t } : { ...e };
        return (
          !n.component &&
            !n.loadComponent &&
            (t || n.loadChildren) &&
            n.outlet &&
            n.outlet !== k &&
            (n.component = bc),
          n
        );
      }
      function dt(e) {
        return e.outlet || k;
      }
      function Fv(e, t) {
        const n = e.filter((r) => dt(r) === t);
        return n.push(...e.filter((r) => dt(r) !== t)), n;
      }
      function Go(e) {
        if (!e) return null;
        if (e.routeConfig?._injector) return e.routeConfig._injector;
        for (let t = e.parent; t; t = t.parent) {
          const n = t.routeConfig;
          if (n?._loadedInjector) return n._loadedInjector;
          if (n?._injector) return n._injector;
        }
        return null;
      }
      class px {
        constructor(t, n, r, o) {
          (this.routeReuseStrategy = t),
            (this.futureState = n),
            (this.currState = r),
            (this.forwardEvent = o);
        }
        activate(t) {
          const n = this.futureState._root,
            r = this.currState ? this.currState._root : null;
          this.deactivateChildRoutes(n, r, t),
            _c(this.futureState.root),
            this.activateChildRoutes(n, r, t);
        }
        deactivateChildRoutes(t, n, r) {
          const o = Rr(n);
          t.children.forEach((i) => {
            const s = i.value.outlet;
            this.deactivateRoutes(i, o[s], r), delete o[s];
          }),
            Te(o, (i, s) => {
              this.deactivateRouteAndItsChildren(i, r);
            });
        }
        deactivateRoutes(t, n, r) {
          const o = t.value,
            i = n ? n.value : null;
          if (o === i)
            if (o.component) {
              const s = r.getContext(o.outlet);
              s && this.deactivateChildRoutes(t, n, s.children);
            } else this.deactivateChildRoutes(t, n, r);
          else i && this.deactivateRouteAndItsChildren(n, r);
        }
        deactivateRouteAndItsChildren(t, n) {
          t.value.component &&
          this.routeReuseStrategy.shouldDetach(t.value.snapshot)
            ? this.detachAndStoreRouteSubtree(t, n)
            : this.deactivateRouteAndOutlet(t, n);
        }
        detachAndStoreRouteSubtree(t, n) {
          const r = n.getContext(t.value.outlet),
            o = r && t.value.component ? r.children : n,
            i = Rr(t);
          for (const s of Object.keys(i))
            this.deactivateRouteAndItsChildren(i[s], o);
          if (r && r.outlet) {
            const s = r.outlet.detach(),
              a = r.children.onOutletDeactivated();
            this.routeReuseStrategy.store(t.value.snapshot, {
              componentRef: s,
              route: t,
              contexts: a,
            });
          }
        }
        deactivateRouteAndOutlet(t, n) {
          const r = n.getContext(t.value.outlet),
            o = r && t.value.component ? r.children : n,
            i = Rr(t);
          for (const s of Object.keys(i))
            this.deactivateRouteAndItsChildren(i[s], o);
          r &&
            (r.outlet &&
              (r.outlet.deactivate(), r.children.onOutletDeactivated()),
            (r.attachRef = null),
            (r.resolver = null),
            (r.route = null));
        }
        activateChildRoutes(t, n, r) {
          const o = Rr(n);
          t.children.forEach((i) => {
            this.activateRoutes(i, o[i.value.outlet], r),
              this.forwardEvent(new YR(i.value.snapshot));
          }),
            t.children.length && this.forwardEvent(new ZR(t.value.snapshot));
        }
        activateRoutes(t, n, r) {
          const o = t.value,
            i = n ? n.value : null;
          if ((_c(o), o === i))
            if (o.component) {
              const s = r.getOrCreateContext(o.outlet);
              this.activateChildRoutes(t, n, s.children);
            } else this.activateChildRoutes(t, n, r);
          else if (o.component) {
            const s = r.getOrCreateContext(o.outlet);
            if (this.routeReuseStrategy.shouldAttach(o.snapshot)) {
              const a = this.routeReuseStrategy.retrieve(o.snapshot);
              this.routeReuseStrategy.store(o.snapshot, null),
                s.children.onOutletReAttached(a.contexts),
                (s.attachRef = a.componentRef),
                (s.route = a.route.value),
                s.outlet && s.outlet.attach(a.componentRef, a.route.value),
                _c(a.route.value),
                this.activateChildRoutes(t, null, s.children);
            } else {
              const a = Go(o.snapshot),
                u = a?.get(fo) ?? null;
              (s.attachRef = null),
                (s.route = o),
                (s.resolver = u),
                (s.injector = a),
                s.outlet && s.outlet.activateWith(o, s.injector),
                this.activateChildRoutes(t, null, s.children);
            }
          } else this.activateChildRoutes(t, null, r);
        }
      }
      class Lv {
        constructor(t) {
          (this.path = t), (this.route = this.path[this.path.length - 1]);
        }
      }
      class Us {
        constructor(t, n) {
          (this.component = t), (this.route = n);
        }
      }
      function gx(e, t, n) {
        const r = e._root;
        return Wo(r, t ? t._root : null, n, [r.value]);
      }
      function Nr(e, t) {
        const n = Symbol(),
          r = t.get(e, n);
        return r === n
          ? "function" != typeof e ||
            (function JD(e) {
              return null !== ri(e);
            })(e)
            ? t.get(e)
            : e
          : r;
      }
      function Wo(
        e,
        t,
        n,
        r,
        o = { canDeactivateChecks: [], canActivateChecks: [] }
      ) {
        const i = Rr(t);
        return (
          e.children.forEach((s) => {
            (function yx(
              e,
              t,
              n,
              r,
              o = { canDeactivateChecks: [], canActivateChecks: [] }
            ) {
              const i = e.value,
                s = t ? t.value : null,
                a = n ? n.getContext(e.value.outlet) : null;
              if (s && i.routeConfig === s.routeConfig) {
                const u = (function vx(e, t, n) {
                  if ("function" == typeof n) return n(e, t);
                  switch (n) {
                    case "pathParamsChange":
                      return !kn(e.url, t.url);
                    case "pathParamsOrQueryParamsChange":
                      return (
                        !kn(e.url, t.url) || !Ft(e.queryParams, t.queryParams)
                      );
                    case "always":
                      return !0;
                    case "paramsOrQueryParamsChange":
                      return !Ec(e, t) || !Ft(e.queryParams, t.queryParams);
                    default:
                      return !Ec(e, t);
                  }
                })(s, i, i.routeConfig.runGuardsAndResolvers);
                u
                  ? o.canActivateChecks.push(new Lv(r))
                  : ((i.data = s.data), (i._resolvedData = s._resolvedData)),
                  Wo(e, t, i.component ? (a ? a.children : null) : n, r, o),
                  u &&
                    a &&
                    a.outlet &&
                    a.outlet.isActivated &&
                    o.canDeactivateChecks.push(new Us(a.outlet.component, s));
              } else
                s && qo(t, a, o),
                  o.canActivateChecks.push(new Lv(r)),
                  Wo(e, null, i.component ? (a ? a.children : null) : n, r, o);
            })(s, i[s.value.outlet], n, r.concat([s.value]), o),
              delete i[s.value.outlet];
          }),
          Te(i, (s, a) => qo(s, n.getContext(a), o)),
          o
        );
      }
      function qo(e, t, n) {
        const r = Rr(e),
          o = e.value;
        Te(r, (i, s) => {
          qo(i, o.component ? (t ? t.children.getContext(s) : null) : t, n);
        }),
          n.canDeactivateChecks.push(
            new Us(
              o.component && t && t.outlet && t.outlet.isActivated
                ? t.outlet.component
                : null,
              o
            )
          );
      }
      function Zo(e) {
        return "function" == typeof e;
      }
      function Ac(e) {
        return e instanceof Ts || "EmptyError" === e?.name;
      }
      const Bs = Symbol("INITIAL_VALUE");
      function Pr() {
        return Ot((e) =>
          Ky(
            e.map((t) =>
              t.pipe(
                Fo(1),
                (function cR(...e) {
                  const t = $r(e);
                  return Ee((n, r) => {
                    (t ? ac(e, n, t) : ac(e, n)).subscribe(r);
                  });
                })(Bs)
              )
            )
          ).pipe(
            H((t) => {
              for (const n of t)
                if (!0 !== n) {
                  if (n === Bs) return Bs;
                  if (!1 === n || n instanceof gn) return n;
                }
              return !0;
            }),
            dn((t) => t !== Bs),
            Fo(1)
          )
        );
      }
      function kv(e) {
        return (function yD(...e) {
          return zc(e);
        })(
          Oe((t) => {
            if (jn(t)) throw Rv(0, t);
          }),
          H((t) => !0 === t)
        );
      }
      const Rc = {
        matched: !1,
        consumedSegments: [],
        remainingSegments: [],
        parameters: {},
        positionalParamSegments: {},
      };
      function jv(e, t, n, r, o) {
        const i = xc(e, t, n);
        return i.matched
          ? (function Fx(e, t, n, r) {
              const o = t.canMatch;
              return o && 0 !== o.length
                ? S(
                    o.map((s) => {
                      const a = Nr(s, e);
                      return pn(
                        (function Ix(e) {
                          return e && Zo(e.canMatch);
                        })(a)
                          ? a.canMatch(t, n)
                          : e.runInContext(() => a(t, n))
                      );
                    })
                  ).pipe(Pr(), kv())
                : S(!0);
            })((r = Ov(t, r)), t, n).pipe(H((s) => (!0 === s ? i : { ...Rc })))
          : S(i);
      }
      function xc(e, t, n) {
        if ("" === t.path)
          return "full" === t.pathMatch && (e.hasChildren() || n.length > 0)
            ? { ...Rc }
            : {
                matched: !0,
                consumedSegments: [],
                remainingSegments: n,
                parameters: {},
                positionalParamSegments: {},
              };
        const o = (t.matcher || mR)(n, e, t);
        if (!o) return { ...Rc };
        const i = {};
        Te(o.posParams, (a, u) => {
          i[u] = a.path;
        });
        const s =
          o.consumed.length > 0
            ? { ...i, ...o.consumed[o.consumed.length - 1].parameters }
            : i;
        return {
          matched: !0,
          consumedSegments: o.consumed,
          remainingSegments: n.slice(o.consumed.length),
          parameters: s,
          positionalParamSegments: o.posParams ?? {},
        };
      }
      function Hs(e, t, n, r) {
        if (
          n.length > 0 &&
          (function jx(e, t, n) {
            return n.some((r) => zs(e, t, r) && dt(r) !== k);
          })(e, n, r)
        ) {
          const i = new U(
            t,
            (function kx(e, t, n, r) {
              const o = {};
              (o[k] = r),
                (r._sourceSegment = e),
                (r._segmentIndexShift = t.length);
              for (const i of n)
                if ("" === i.path && dt(i) !== k) {
                  const s = new U([], {});
                  (s._sourceSegment = e),
                    (s._segmentIndexShift = t.length),
                    (o[dt(i)] = s);
                }
              return o;
            })(e, t, r, new U(n, e.children))
          );
          return (
            (i._sourceSegment = e),
            (i._segmentIndexShift = t.length),
            { segmentGroup: i, slicedSegments: [] }
          );
        }
        if (
          0 === n.length &&
          (function $x(e, t, n) {
            return n.some((r) => zs(e, t, r));
          })(e, n, r)
        ) {
          const i = new U(
            e.segments,
            (function Lx(e, t, n, r, o) {
              const i = {};
              for (const s of r)
                if (zs(e, n, s) && !o[dt(s)]) {
                  const a = new U([], {});
                  (a._sourceSegment = e),
                    (a._segmentIndexShift = t.length),
                    (i[dt(s)] = a);
                }
              return { ...o, ...i };
            })(e, t, n, r, e.children)
          );
          return (
            (i._sourceSegment = e),
            (i._segmentIndexShift = t.length),
            { segmentGroup: i, slicedSegments: n }
          );
        }
        const o = new U(e.segments, e.children);
        return (
          (o._sourceSegment = e),
          (o._segmentIndexShift = t.length),
          { segmentGroup: o, slicedSegments: n }
        );
      }
      function zs(e, t, n) {
        return (
          (!(e.hasChildren() || t.length > 0) || "full" !== n.pathMatch) &&
          "" === n.path
        );
      }
      function $v(e, t, n, r) {
        return (
          !!(dt(e) === r || (r !== k && zs(t, n, e))) &&
          ("**" === e.path || xc(t, e, n).matched)
        );
      }
      function Vv(e, t, n) {
        return 0 === t.length && !e.children[n];
      }
      const Gs = !1;
      class Ws {
        constructor(t) {
          this.segmentGroup = t || null;
        }
      }
      class Uv {
        constructor(t) {
          this.urlTree = t;
        }
      }
      function Qo(e) {
        return Oo(new Ws(e));
      }
      function Bv(e) {
        return Oo(new Uv(e));
      }
      class Hx {
        constructor(t, n, r, o, i) {
          (this.injector = t),
            (this.configLoader = n),
            (this.urlSerializer = r),
            (this.urlTree = o),
            (this.config = i),
            (this.allowRedirects = !0);
        }
        apply() {
          const t = Hs(this.urlTree.root, [], [], this.config).segmentGroup,
            n = new U(t.segments, t.children);
          return this.expandSegmentGroup(this.injector, this.config, n, k)
            .pipe(
              H((i) =>
                this.createUrlTree(
                  Ls(i),
                  this.urlTree.queryParams,
                  this.urlTree.fragment
                )
              )
            )
            .pipe(
              hn((i) => {
                if (i instanceof Uv)
                  return (this.allowRedirects = !1), this.match(i.urlTree);
                throw i instanceof Ws ? this.noMatchError(i) : i;
              })
            );
        }
        match(t) {
          return this.expandSegmentGroup(this.injector, this.config, t.root, k)
            .pipe(
              H((o) => this.createUrlTree(Ls(o), t.queryParams, t.fragment))
            )
            .pipe(
              hn((o) => {
                throw o instanceof Ws ? this.noMatchError(o) : o;
              })
            );
        }
        noMatchError(t) {
          return new w(4002, Gs);
        }
        createUrlTree(t, n, r) {
          const o = hc(t);
          return new gn(o, n, r);
        }
        expandSegmentGroup(t, n, r, o) {
          return 0 === r.segments.length && r.hasChildren()
            ? this.expandChildren(t, n, r).pipe(H((i) => new U([], i)))
            : this.expandSegment(t, r, n, r.segments, o, !0);
        }
        expandChildren(t, n, r) {
          const o = [];
          for (const i of Object.keys(r.children))
            "primary" === i ? o.unshift(i) : o.push(i);
          return De(o).pipe(
            Ln((i) => {
              const s = r.children[i],
                a = Fv(n, i);
              return this.expandSegmentGroup(t, a, s, i).pipe(
                H((u) => ({ segment: u, outlet: i }))
              );
            }),
            nv((i, s) => ((i[s.outlet] = s.segment), i), {}),
            rv()
          );
        }
        expandSegment(t, n, r, o, i, s) {
          return De(r).pipe(
            Ln((a) =>
              this.expandSegmentAgainstRoute(t, n, r, a, o, i, s).pipe(
                hn((l) => {
                  if (l instanceof Ws) return S(null);
                  throw l;
                })
              )
            ),
            fn((a) => !!a),
            hn((a, u) => {
              if (Ac(a)) return Vv(n, o, i) ? S(new U([], {})) : Qo(n);
              throw a;
            })
          );
        }
        expandSegmentAgainstRoute(t, n, r, o, i, s, a) {
          return $v(o, n, i, s)
            ? void 0 === o.redirectTo
              ? this.matchSegmentAgainstRoute(t, n, o, i, s)
              : a && this.allowRedirects
              ? this.expandSegmentAgainstRouteUsingRedirect(t, n, r, o, i, s)
              : Qo(n)
            : Qo(n);
        }
        expandSegmentAgainstRouteUsingRedirect(t, n, r, o, i, s) {
          return "**" === o.path
            ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(t, r, o, s)
            : this.expandRegularSegmentAgainstRouteUsingRedirect(
                t,
                n,
                r,
                o,
                i,
                s
              );
        }
        expandWildCardWithParamsAgainstRouteUsingRedirect(t, n, r, o) {
          const i = this.applyRedirectCommands([], r.redirectTo, {});
          return r.redirectTo.startsWith("/")
            ? Bv(i)
            : this.lineralizeSegments(r, i).pipe(
                Se((s) => {
                  const a = new U(s, {});
                  return this.expandSegment(t, a, n, s, o, !1);
                })
              );
        }
        expandRegularSegmentAgainstRouteUsingRedirect(t, n, r, o, i, s) {
          const {
            matched: a,
            consumedSegments: u,
            remainingSegments: l,
            positionalParamSegments: c,
          } = xc(n, o, i);
          if (!a) return Qo(n);
          const d = this.applyRedirectCommands(u, o.redirectTo, c);
          return o.redirectTo.startsWith("/")
            ? Bv(d)
            : this.lineralizeSegments(o, d).pipe(
                Se((f) => this.expandSegment(t, n, r, f.concat(l), s, !1))
              );
        }
        matchSegmentAgainstRoute(t, n, r, o, i) {
          return "**" === r.path
            ? ((t = Ov(r, t)),
              r.loadChildren
                ? (r._loadedRoutes
                    ? S({
                        routes: r._loadedRoutes,
                        injector: r._loadedInjector,
                      })
                    : this.configLoader.loadChildren(t, r)
                  ).pipe(
                    H(
                      (a) => (
                        (r._loadedRoutes = a.routes),
                        (r._loadedInjector = a.injector),
                        new U(o, {})
                      )
                    )
                  )
                : S(new U(o, {})))
            : jv(n, r, o, t).pipe(
                Ot(
                  ({ matched: s, consumedSegments: a, remainingSegments: u }) =>
                    s
                      ? this.getChildConfig((t = r._injector ?? t), r, o).pipe(
                          Se((c) => {
                            const d = c.injector ?? t,
                              f = c.routes,
                              { segmentGroup: h, slicedSegments: p } = Hs(
                                n,
                                a,
                                u,
                                f
                              ),
                              g = new U(h.segments, h.children);
                            if (0 === p.length && g.hasChildren())
                              return this.expandChildren(d, f, g).pipe(
                                H((y) => new U(a, y))
                              );
                            if (0 === f.length && 0 === p.length)
                              return S(new U(a, {}));
                            const m = dt(r) === i;
                            return this.expandSegment(
                              d,
                              g,
                              f,
                              p,
                              m ? k : i,
                              !0
                            ).pipe(
                              H((_) => new U(a.concat(_.segments), _.children))
                            );
                          })
                        )
                      : Qo(n)
                )
              );
        }
        getChildConfig(t, n, r) {
          return n.children
            ? S({ routes: n.children, injector: t })
            : n.loadChildren
            ? void 0 !== n._loadedRoutes
              ? S({ routes: n._loadedRoutes, injector: n._loadedInjector })
              : (function Ox(e, t, n, r) {
                  const o = t.canLoad;
                  return void 0 === o || 0 === o.length
                    ? S(!0)
                    : S(
                        o.map((s) => {
                          const a = Nr(s, e);
                          return pn(
                            (function wx(e) {
                              return e && Zo(e.canLoad);
                            })(a)
                              ? a.canLoad(t, n)
                              : e.runInContext(() => a(t, n))
                          );
                        })
                      ).pipe(Pr(), kv());
                })(t, n, r).pipe(
                  Se((o) =>
                    o
                      ? this.configLoader.loadChildren(t, n).pipe(
                          Oe((i) => {
                            (n._loadedRoutes = i.routes),
                              (n._loadedInjector = i.injector);
                          })
                        )
                      : (function Ux(e) {
                          return Oo(xv(Gs, 3));
                        })()
                  )
                )
            : S({ routes: [], injector: t });
        }
        lineralizeSegments(t, n) {
          let r = [],
            o = n.root;
          for (;;) {
            if (((r = r.concat(o.segments)), 0 === o.numberOfChildren))
              return S(r);
            if (o.numberOfChildren > 1 || !o.children[k])
              return t.redirectTo, Oo(new w(4e3, Gs));
            o = o.children[k];
          }
        }
        applyRedirectCommands(t, n, r) {
          return this.applyRedirectCreateUrlTree(
            n,
            this.urlSerializer.parse(n),
            t,
            r
          );
        }
        applyRedirectCreateUrlTree(t, n, r, o) {
          const i = this.createSegmentGroup(t, n.root, r, o);
          return new gn(
            i,
            this.createQueryParams(n.queryParams, this.urlTree.queryParams),
            n.fragment
          );
        }
        createQueryParams(t, n) {
          const r = {};
          return (
            Te(t, (o, i) => {
              if ("string" == typeof o && o.startsWith(":")) {
                const a = o.substring(1);
                r[i] = n[a];
              } else r[i] = o;
            }),
            r
          );
        }
        createSegmentGroup(t, n, r, o) {
          const i = this.createSegments(t, n.segments, r, o);
          let s = {};
          return (
            Te(n.children, (a, u) => {
              s[u] = this.createSegmentGroup(t, a, r, o);
            }),
            new U(i, s)
          );
        }
        createSegments(t, n, r, o) {
          return n.map((i) =>
            i.path.startsWith(":")
              ? this.findPosParam(t, i, o)
              : this.findOrReturn(i, r)
          );
        }
        findPosParam(t, n, r) {
          const o = r[n.path.substring(1)];
          if (!o) throw new w(4001, Gs);
          return o;
        }
        findOrReturn(t, n) {
          let r = 0;
          for (const o of n) {
            if (o.path === t.path) return n.splice(r), o;
            r++;
          }
          return t;
        }
      }
      class Gx {}
      class Zx {
        constructor(t, n, r, o, i, s, a) {
          (this.injector = t),
            (this.rootComponentType = n),
            (this.config = r),
            (this.urlTree = o),
            (this.url = i),
            (this.paramsInheritanceStrategy = s),
            (this.urlSerializer = a);
        }
        recognize() {
          const t = Hs(
            this.urlTree.root,
            [],
            [],
            this.config.filter((n) => void 0 === n.redirectTo)
          ).segmentGroup;
          return this.processSegmentGroup(
            this.injector,
            this.config,
            t,
            k
          ).pipe(
            H((n) => {
              if (null === n) return null;
              const r = new $s(
                  [],
                  Object.freeze({}),
                  Object.freeze({ ...this.urlTree.queryParams }),
                  this.urlTree.fragment,
                  {},
                  k,
                  this.rootComponentType,
                  null,
                  this.urlTree.root,
                  -1,
                  {}
                ),
                o = new tn(r, n),
                i = new Tv(this.url, o);
              return this.inheritParamsAndData(i._root), i;
            })
          );
        }
        inheritParamsAndData(t) {
          const n = t.value,
            r = Mv(n, this.paramsInheritanceStrategy);
          (n.params = Object.freeze(r.params)),
            (n.data = Object.freeze(r.data)),
            t.children.forEach((o) => this.inheritParamsAndData(o));
        }
        processSegmentGroup(t, n, r, o) {
          return 0 === r.segments.length && r.hasChildren()
            ? this.processChildren(t, n, r)
            : this.processSegment(t, n, r, r.segments, o);
        }
        processChildren(t, n, r) {
          return De(Object.keys(r.children)).pipe(
            Ln((o) => {
              const i = r.children[o],
                s = Fv(n, o);
              return this.processSegmentGroup(t, s, i, o);
            }),
            nv((o, i) => (o && i ? (o.push(...i), o) : null)),
            (function hR(e, t = !1) {
              return Ee((n, r) => {
                let o = 0;
                n.subscribe(
                  Ie(r, (i) => {
                    const s = e(i, o++);
                    (s || t) && r.next(i), !s && r.complete();
                  })
                );
              });
            })((o) => null !== o),
            As(null),
            rv(),
            H((o) => {
              if (null === o) return null;
              const i = zv(o);
              return (
                (function Qx(e) {
                  e.sort((t, n) =>
                    t.value.outlet === k
                      ? -1
                      : n.value.outlet === k
                      ? 1
                      : t.value.outlet.localeCompare(n.value.outlet)
                  );
                })(i),
                i
              );
            })
          );
        }
        processSegment(t, n, r, o, i) {
          return De(n).pipe(
            Ln((s) =>
              this.processSegmentAgainstRoute(s._injector ?? t, s, r, o, i)
            ),
            fn((s) => !!s),
            hn((s) => {
              if (Ac(s)) return Vv(r, o, i) ? S([]) : S(null);
              throw s;
            })
          );
        }
        processSegmentAgainstRoute(t, n, r, o, i) {
          if (n.redirectTo || !$v(n, r, o, i)) return S(null);
          let s;
          if ("**" === n.path) {
            const a = o.length > 0 ? sv(o).parameters : {},
              u = Wv(r) + o.length;
            s = S({
              snapshot: new $s(
                o,
                a,
                Object.freeze({ ...this.urlTree.queryParams }),
                this.urlTree.fragment,
                qv(n),
                dt(n),
                n.component ?? n._loadedComponent ?? null,
                n,
                Gv(r),
                u,
                Zv(n)
              ),
              consumedSegments: [],
              remainingSegments: [],
            });
          } else
            s = jv(r, n, o, t).pipe(
              H(
                ({
                  matched: a,
                  consumedSegments: u,
                  remainingSegments: l,
                  parameters: c,
                }) => {
                  if (!a) return null;
                  const d = Wv(r) + u.length;
                  return {
                    snapshot: new $s(
                      u,
                      c,
                      Object.freeze({ ...this.urlTree.queryParams }),
                      this.urlTree.fragment,
                      qv(n),
                      dt(n),
                      n.component ?? n._loadedComponent ?? null,
                      n,
                      Gv(r),
                      d,
                      Zv(n)
                    ),
                    consumedSegments: u,
                    remainingSegments: l,
                  };
                }
              )
            );
          return s.pipe(
            Ot((a) => {
              if (null === a) return S(null);
              const {
                snapshot: u,
                consumedSegments: l,
                remainingSegments: c,
              } = a;
              t = n._injector ?? t;
              const d = n._loadedInjector ?? t,
                f = (function Yx(e) {
                  return e.children
                    ? e.children
                    : e.loadChildren
                    ? e._loadedRoutes
                    : [];
                })(n),
                { segmentGroup: h, slicedSegments: p } = Hs(
                  r,
                  l,
                  c,
                  f.filter((m) => void 0 === m.redirectTo)
                );
              if (0 === p.length && h.hasChildren())
                return this.processChildren(d, f, h).pipe(
                  H((m) => (null === m ? null : [new tn(u, m)]))
                );
              if (0 === f.length && 0 === p.length) return S([new tn(u, [])]);
              const g = dt(n) === i;
              return this.processSegment(d, f, h, p, g ? k : i).pipe(
                H((m) => (null === m ? null : [new tn(u, m)]))
              );
            })
          );
        }
      }
      function Kx(e) {
        const t = e.value.routeConfig;
        return t && "" === t.path && void 0 === t.redirectTo;
      }
      function zv(e) {
        const t = [],
          n = new Set();
        for (const r of e) {
          if (!Kx(r)) {
            t.push(r);
            continue;
          }
          const o = t.find((i) => r.value.routeConfig === i.value.routeConfig);
          void 0 !== o ? (o.children.push(...r.children), n.add(o)) : t.push(r);
        }
        for (const r of n) {
          const o = zv(r.children);
          t.push(new tn(r.value, o));
        }
        return t.filter((r) => !n.has(r));
      }
      function Gv(e) {
        let t = e;
        for (; t._sourceSegment; ) t = t._sourceSegment;
        return t;
      }
      function Wv(e) {
        let t = e,
          n = t._segmentIndexShift ?? 0;
        for (; t._sourceSegment; )
          (t = t._sourceSegment), (n += t._segmentIndexShift ?? 0);
        return n - 1;
      }
      function qv(e) {
        return e.data || {};
      }
      function Zv(e) {
        return e.resolve || {};
      }
      function Qv(e) {
        return "string" == typeof e.title || null === e.title;
      }
      function Nc(e) {
        return Ot((t) => {
          const n = e(t);
          return n ? De(n).pipe(H(() => t)) : S(t);
        });
      }
      const Or = new A("ROUTES");
      let Pc = (() => {
        class e {
          constructor() {
            (this.componentLoaders = new WeakMap()),
              (this.childrenLoaders = new WeakMap()),
              (this.compiler = z(xm));
          }
          loadComponent(n) {
            if (this.componentLoaders.get(n))
              return this.componentLoaders.get(n);
            if (n._loadedComponent) return S(n._loadedComponent);
            this.onLoadStartListener && this.onLoadStartListener(n);
            const r = pn(n.loadComponent()).pipe(
                H(Kv),
                Oe((i) => {
                  this.onLoadEndListener && this.onLoadEndListener(n),
                    (n._loadedComponent = i);
                }),
                cc(() => {
                  this.componentLoaders.delete(n);
                })
              ),
              o = new ev(r, () => new kt()).pipe(uc());
            return this.componentLoaders.set(n, o), o;
          }
          loadChildren(n, r) {
            if (this.childrenLoaders.get(r)) return this.childrenLoaders.get(r);
            if (r._loadedRoutes)
              return S({
                routes: r._loadedRoutes,
                injector: r._loadedInjector,
              });
            this.onLoadStartListener && this.onLoadStartListener(r);
            const i = this.loadModuleFactoryOrRoutes(r.loadChildren).pipe(
                H((a) => {
                  this.onLoadEndListener && this.onLoadEndListener(r);
                  let u,
                    l,
                    c = !1;
                  Array.isArray(a)
                    ? (l = a)
                    : ((u = a.create(n).injector),
                      (l = iv(u.get(Or, [], M.Self | M.Optional))));
                  return { routes: l.map(Tc), injector: u };
                }),
                cc(() => {
                  this.childrenLoaders.delete(r);
                })
              ),
              s = new ev(i, () => new kt()).pipe(uc());
            return this.childrenLoaders.set(r, s), s;
          }
          loadModuleFactoryOrRoutes(n) {
            return pn(n()).pipe(
              H(Kv),
              Se((r) =>
                r instanceof Vg || Array.isArray(r)
                  ? S(r)
                  : De(this.compiler.compileModuleAsync(r))
              )
            );
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = P({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      function Kv(e) {
        return (function iN(e) {
          return e && "object" == typeof e && "default" in e;
        })(e)
          ? e.default
          : e;
      }
      let Zs = (() => {
        class e {
          get hasRequestedNavigation() {
            return 0 !== this.navigationId;
          }
          constructor() {
            (this.currentNavigation = null),
              (this.lastSuccessfulNavigation = null),
              (this.events = new kt()),
              (this.configLoader = z(Pc)),
              (this.environmentInjector = z(Wt)),
              (this.urlSerializer = z(jo)),
              (this.rootContexts = z(zo)),
              (this.navigationId = 0),
              (this.afterPreactivation = () => S(void 0)),
              (this.rootComponentType = null),
              (this.configLoader.onLoadEndListener = (o) =>
                this.events.next(new WR(o))),
              (this.configLoader.onLoadStartListener = (o) =>
                this.events.next(new GR(o)));
          }
          complete() {
            this.transitions?.complete();
          }
          handleNavigationRequest(n) {
            const r = ++this.navigationId;
            this.transitions?.next({ ...this.transitions.value, ...n, id: r });
          }
          setupNavigations(n) {
            return (
              (this.transitions = new Et({
                id: 0,
                targetPageId: 0,
                currentUrlTree: n.currentUrlTree,
                currentRawUrl: n.currentUrlTree,
                extractedUrl: n.urlHandlingStrategy.extract(n.currentUrlTree),
                urlAfterRedirects: n.urlHandlingStrategy.extract(
                  n.currentUrlTree
                ),
                rawUrl: n.currentUrlTree,
                extras: {},
                resolve: null,
                reject: null,
                promise: Promise.resolve(!0),
                source: Bo,
                restoredState: null,
                currentSnapshot: n.routerState.snapshot,
                targetSnapshot: null,
                currentRouterState: n.routerState,
                targetRouterState: null,
                guards: { canActivateChecks: [], canDeactivateChecks: [] },
                guardsResult: null,
              })),
              this.transitions.pipe(
                dn((r) => 0 !== r.id),
                H((r) => ({
                  ...r,
                  extractedUrl: n.urlHandlingStrategy.extract(r.rawUrl),
                })),
                Ot((r) => {
                  let o = !1,
                    i = !1;
                  return S(r).pipe(
                    Oe((s) => {
                      this.currentNavigation = {
                        id: s.id,
                        initialUrl: s.rawUrl,
                        extractedUrl: s.extractedUrl,
                        trigger: s.source,
                        extras: s.extras,
                        previousNavigation: this.lastSuccessfulNavigation
                          ? {
                              ...this.lastSuccessfulNavigation,
                              previousNavigation: null,
                            }
                          : null,
                      };
                    }),
                    Ot((s) => {
                      const a = n.browserUrlTree.toString(),
                        u =
                          !n.navigated ||
                          s.extractedUrl.toString() !== a ||
                          a !== n.currentUrlTree.toString();
                      if (
                        !u &&
                        "reload" !==
                          (s.extras.onSameUrlNavigation ??
                            n.onSameUrlNavigation)
                      ) {
                        const c = "";
                        return (
                          this.events.next(
                            new js(s.id, n.serializeUrl(r.rawUrl), c, 0)
                          ),
                          (n.rawUrlTree = s.rawUrl),
                          s.resolve(null),
                          It
                        );
                      }
                      if (n.urlHandlingStrategy.shouldProcessUrl(s.rawUrl))
                        return (
                          Xv(s.source) && (n.browserUrlTree = s.extractedUrl),
                          S(s).pipe(
                            Ot((c) => {
                              const d = this.transitions?.getValue();
                              return (
                                this.events.next(
                                  new yc(
                                    c.id,
                                    this.urlSerializer.serialize(
                                      c.extractedUrl
                                    ),
                                    c.source,
                                    c.restoredState
                                  )
                                ),
                                d !== this.transitions?.getValue()
                                  ? It
                                  : Promise.resolve(c)
                              );
                            }),
                            (function zx(e, t, n, r) {
                              return Ot((o) =>
                                (function Bx(e, t, n, r, o) {
                                  return new Hx(e, t, n, r, o).apply();
                                })(e, t, n, o.extractedUrl, r).pipe(
                                  H((i) => ({ ...o, urlAfterRedirects: i }))
                                )
                              );
                            })(
                              this.environmentInjector,
                              this.configLoader,
                              this.urlSerializer,
                              n.config
                            ),
                            Oe((c) => {
                              (this.currentNavigation = {
                                ...this.currentNavigation,
                                finalUrl: c.urlAfterRedirects,
                              }),
                                (r.urlAfterRedirects = c.urlAfterRedirects);
                            }),
                            (function Jx(e, t, n, r, o) {
                              return Se((i) =>
                                (function qx(
                                  e,
                                  t,
                                  n,
                                  r,
                                  o,
                                  i,
                                  s = "emptyOnly"
                                ) {
                                  return new Zx(e, t, n, r, o, s, i)
                                    .recognize()
                                    .pipe(
                                      Ot((a) =>
                                        null === a
                                          ? (function Wx(e) {
                                              return new ve((t) => t.error(e));
                                            })(new Gx())
                                          : S(a)
                                      )
                                    );
                                })(
                                  e,
                                  t,
                                  n,
                                  i.urlAfterRedirects,
                                  r.serialize(i.urlAfterRedirects),
                                  r,
                                  o
                                ).pipe(H((s) => ({ ...i, targetSnapshot: s })))
                              );
                            })(
                              this.environmentInjector,
                              this.rootComponentType,
                              n.config,
                              this.urlSerializer,
                              n.paramsInheritanceStrategy
                            ),
                            Oe((c) => {
                              if (
                                ((r.targetSnapshot = c.targetSnapshot),
                                "eager" === n.urlUpdateStrategy)
                              ) {
                                if (!c.extras.skipLocationChange) {
                                  const f = n.urlHandlingStrategy.merge(
                                    c.urlAfterRedirects,
                                    c.rawUrl
                                  );
                                  n.setBrowserUrl(f, c);
                                }
                                n.browserUrlTree = c.urlAfterRedirects;
                              }
                              const d = new VR(
                                c.id,
                                this.urlSerializer.serialize(c.extractedUrl),
                                this.urlSerializer.serialize(
                                  c.urlAfterRedirects
                                ),
                                c.targetSnapshot
                              );
                              this.events.next(d);
                            })
                          )
                        );
                      if (
                        u &&
                        n.urlHandlingStrategy.shouldProcessUrl(n.rawUrlTree)
                      ) {
                        const {
                            id: c,
                            extractedUrl: d,
                            source: f,
                            restoredState: h,
                            extras: p,
                          } = s,
                          g = new yc(c, this.urlSerializer.serialize(d), f, h);
                        this.events.next(g);
                        const m = bv(d, this.rootComponentType).snapshot;
                        return S(
                          (r = {
                            ...s,
                            targetSnapshot: m,
                            urlAfterRedirects: d,
                            extras: {
                              ...p,
                              skipLocationChange: !1,
                              replaceUrl: !1,
                            },
                          })
                        );
                      }
                      {
                        const c = "";
                        return (
                          this.events.next(
                            new js(s.id, n.serializeUrl(r.extractedUrl), c, 1)
                          ),
                          (n.rawUrlTree = s.rawUrl),
                          s.resolve(null),
                          It
                        );
                      }
                    }),
                    Oe((s) => {
                      const a = new UR(
                        s.id,
                        this.urlSerializer.serialize(s.extractedUrl),
                        this.urlSerializer.serialize(s.urlAfterRedirects),
                        s.targetSnapshot
                      );
                      this.events.next(a);
                    }),
                    H(
                      (s) =>
                        (r = {
                          ...s,
                          guards: gx(
                            s.targetSnapshot,
                            s.currentSnapshot,
                            this.rootContexts
                          ),
                        })
                    ),
                    (function bx(e, t) {
                      return Se((n) => {
                        const {
                          targetSnapshot: r,
                          currentSnapshot: o,
                          guards: {
                            canActivateChecks: i,
                            canDeactivateChecks: s,
                          },
                        } = n;
                        return 0 === s.length && 0 === i.length
                          ? S({ ...n, guardsResult: !0 })
                          : (function Mx(e, t, n, r) {
                              return De(e).pipe(
                                Se((o) =>
                                  (function Px(e, t, n, r, o) {
                                    const i =
                                      t && t.routeConfig
                                        ? t.routeConfig.canDeactivate
                                        : null;
                                    return i && 0 !== i.length
                                      ? S(
                                          i.map((a) => {
                                            const u = Go(t) ?? o,
                                              l = Nr(a, u);
                                            return pn(
                                              (function Ex(e) {
                                                return e && Zo(e.canDeactivate);
                                              })(l)
                                                ? l.canDeactivate(e, t, n, r)
                                                : u.runInContext(() =>
                                                    l(e, t, n, r)
                                                  )
                                            ).pipe(fn());
                                          })
                                        ).pipe(Pr())
                                      : S(!0);
                                  })(o.component, o.route, n, t, r)
                                ),
                                fn((o) => !0 !== o, !0)
                              );
                            })(s, r, o, e).pipe(
                              Se((a) =>
                                a &&
                                (function Dx(e) {
                                  return "boolean" == typeof e;
                                })(a)
                                  ? (function Tx(e, t, n, r) {
                                      return De(t).pipe(
                                        Ln((o) =>
                                          ac(
                                            (function Rx(e, t) {
                                              return (
                                                null !== e && t && t(new qR(e)),
                                                S(!0)
                                              );
                                            })(o.route.parent, r),
                                            (function Ax(e, t) {
                                              return (
                                                null !== e && t && t(new QR(e)),
                                                S(!0)
                                              );
                                            })(o.route, r),
                                            (function Nx(e, t, n) {
                                              const r = t[t.length - 1],
                                                i = t
                                                  .slice(0, t.length - 1)
                                                  .reverse()
                                                  .map((s) =>
                                                    (function mx(e) {
                                                      const t = e.routeConfig
                                                        ? e.routeConfig
                                                            .canActivateChild
                                                        : null;
                                                      return t && 0 !== t.length
                                                        ? { node: e, guards: t }
                                                        : null;
                                                    })(s)
                                                  )
                                                  .filter((s) => null !== s)
                                                  .map((s) =>
                                                    Jy(() =>
                                                      S(
                                                        s.guards.map((u) => {
                                                          const l =
                                                              Go(s.node) ?? n,
                                                            c = Nr(u, l);
                                                          return pn(
                                                            (function _x(e) {
                                                              return (
                                                                e &&
                                                                Zo(
                                                                  e.canActivateChild
                                                                )
                                                              );
                                                            })(c)
                                                              ? c.canActivateChild(
                                                                  r,
                                                                  e
                                                                )
                                                              : l.runInContext(
                                                                  () => c(r, e)
                                                                )
                                                          ).pipe(fn());
                                                        })
                                                      ).pipe(Pr())
                                                    )
                                                  );
                                              return S(i).pipe(Pr());
                                            })(e, o.path, n),
                                            (function xx(e, t, n) {
                                              const r = t.routeConfig
                                                ? t.routeConfig.canActivate
                                                : null;
                                              if (!r || 0 === r.length)
                                                return S(!0);
                                              const o = r.map((i) =>
                                                Jy(() => {
                                                  const s = Go(t) ?? n,
                                                    a = Nr(i, s);
                                                  return pn(
                                                    (function Cx(e) {
                                                      return (
                                                        e && Zo(e.canActivate)
                                                      );
                                                    })(a)
                                                      ? a.canActivate(t, e)
                                                      : s.runInContext(() =>
                                                          a(t, e)
                                                        )
                                                  ).pipe(fn());
                                                })
                                              );
                                              return S(o).pipe(Pr());
                                            })(e, o.route, n)
                                          )
                                        ),
                                        fn((o) => !0 !== o, !0)
                                      );
                                    })(r, i, e, t)
                                  : S(a)
                              ),
                              H((a) => ({ ...n, guardsResult: a }))
                            );
                      });
                    })(this.environmentInjector, (s) => this.events.next(s)),
                    Oe((s) => {
                      if (
                        ((r.guardsResult = s.guardsResult), jn(s.guardsResult))
                      )
                        throw Rv(0, s.guardsResult);
                      const a = new BR(
                        s.id,
                        this.urlSerializer.serialize(s.extractedUrl),
                        this.urlSerializer.serialize(s.urlAfterRedirects),
                        s.targetSnapshot,
                        !!s.guardsResult
                      );
                      this.events.next(a);
                    }),
                    dn(
                      (s) =>
                        !!s.guardsResult ||
                        (n.restoreHistory(s),
                        this.cancelNavigationTransition(s, "", 3),
                        !1)
                    ),
                    Nc((s) => {
                      if (s.guards.canActivateChecks.length)
                        return S(s).pipe(
                          Oe((a) => {
                            const u = new HR(
                              a.id,
                              this.urlSerializer.serialize(a.extractedUrl),
                              this.urlSerializer.serialize(a.urlAfterRedirects),
                              a.targetSnapshot
                            );
                            this.events.next(u);
                          }),
                          Ot((a) => {
                            let u = !1;
                            return S(a).pipe(
                              (function eN(e, t) {
                                return Se((n) => {
                                  const {
                                    targetSnapshot: r,
                                    guards: { canActivateChecks: o },
                                  } = n;
                                  if (!o.length) return S(n);
                                  let i = 0;
                                  return De(o).pipe(
                                    Ln((s) =>
                                      (function tN(e, t, n, r) {
                                        const o = e.routeConfig,
                                          i = e._resolve;
                                        return (
                                          void 0 !== o?.title &&
                                            !Qv(o) &&
                                            (i[Lo] = o.title),
                                          (function nN(e, t, n, r) {
                                            const o = (function rN(e) {
                                              return [
                                                ...Object.keys(e),
                                                ...Object.getOwnPropertySymbols(
                                                  e
                                                ),
                                              ];
                                            })(e);
                                            if (0 === o.length) return S({});
                                            const i = {};
                                            return De(o).pipe(
                                              Se((s) =>
                                                (function oN(e, t, n, r) {
                                                  const o = Go(t) ?? r,
                                                    i = Nr(e, o);
                                                  return pn(
                                                    i.resolve
                                                      ? i.resolve(t, n)
                                                      : o.runInContext(() =>
                                                          i(t, n)
                                                        )
                                                  );
                                                })(e[s], t, n, r).pipe(
                                                  fn(),
                                                  Oe((a) => {
                                                    i[s] = a;
                                                  })
                                                )
                                              ),
                                              lc(1),
                                              (function pR(e) {
                                                return H(() => e);
                                              })(i),
                                              hn((s) => (Ac(s) ? It : Oo(s)))
                                            );
                                          })(i, e, t, r).pipe(
                                            H(
                                              (s) => (
                                                (e._resolvedData = s),
                                                (e.data = Mv(e, n).resolve),
                                                o &&
                                                  Qv(o) &&
                                                  (e.data[Lo] = o.title),
                                                null
                                              )
                                            )
                                          )
                                        );
                                      })(s.route, r, e, t)
                                    ),
                                    Oe(() => i++),
                                    lc(1),
                                    Se((s) => (i === o.length ? S(n) : It))
                                  );
                                });
                              })(
                                n.paramsInheritanceStrategy,
                                this.environmentInjector
                              ),
                              Oe({
                                next: () => (u = !0),
                                complete: () => {
                                  u ||
                                    (n.restoreHistory(a),
                                    this.cancelNavigationTransition(a, "", 2));
                                },
                              })
                            );
                          }),
                          Oe((a) => {
                            const u = new zR(
                              a.id,
                              this.urlSerializer.serialize(a.extractedUrl),
                              this.urlSerializer.serialize(a.urlAfterRedirects),
                              a.targetSnapshot
                            );
                            this.events.next(u);
                          })
                        );
                    }),
                    Nc((s) => {
                      const a = (u) => {
                        const l = [];
                        u.routeConfig?.loadComponent &&
                          !u.routeConfig._loadedComponent &&
                          l.push(
                            this.configLoader.loadComponent(u.routeConfig).pipe(
                              Oe((c) => {
                                u.component = c;
                              }),
                              H(() => {})
                            )
                          );
                        for (const c of u.children) l.push(...a(c));
                        return l;
                      };
                      return Ky(a(s.targetSnapshot.root)).pipe(As(), Fo(1));
                    }),
                    Nc(() => this.afterPreactivation()),
                    H((s) => {
                      const a = (function ox(e, t, n) {
                        const r = Ho(e, t._root, n ? n._root : void 0);
                        return new Sv(r, t);
                      })(
                        n.routeReuseStrategy,
                        s.targetSnapshot,
                        s.currentRouterState
                      );
                      return (r = { ...s, targetRouterState: a });
                    }),
                    Oe((s) => {
                      (n.currentUrlTree = s.urlAfterRedirects),
                        (n.rawUrlTree = n.urlHandlingStrategy.merge(
                          s.urlAfterRedirects,
                          s.rawUrl
                        )),
                        (n.routerState = s.targetRouterState),
                        "deferred" === n.urlUpdateStrategy &&
                          (s.extras.skipLocationChange ||
                            n.setBrowserUrl(n.rawUrlTree, s),
                          (n.browserUrlTree = s.urlAfterRedirects));
                    }),
                    ((e, t, n) =>
                      H(
                        (r) => (
                          new px(
                            t,
                            r.targetRouterState,
                            r.currentRouterState,
                            n
                          ).activate(e),
                          r
                        )
                      ))(this.rootContexts, n.routeReuseStrategy, (s) =>
                      this.events.next(s)
                    ),
                    Oe({
                      next: (s) => {
                        (o = !0),
                          (this.lastSuccessfulNavigation =
                            this.currentNavigation),
                          (n.navigated = !0),
                          this.events.next(
                            new $n(
                              s.id,
                              this.urlSerializer.serialize(s.extractedUrl),
                              this.urlSerializer.serialize(n.currentUrlTree)
                            )
                          ),
                          n.titleStrategy?.updateTitle(
                            s.targetRouterState.snapshot
                          ),
                          s.resolve(!0);
                      },
                      complete: () => {
                        o = !0;
                      },
                    }),
                    cc(() => {
                      o || i || this.cancelNavigationTransition(r, "", 1),
                        this.currentNavigation?.id === r.id &&
                          (this.currentNavigation = null);
                    }),
                    hn((s) => {
                      if (((i = !0), Pv(s))) {
                        Nv(s) || ((n.navigated = !0), n.restoreHistory(r, !0));
                        const a = new ks(
                          r.id,
                          this.urlSerializer.serialize(r.extractedUrl),
                          s.message,
                          s.cancellationCode
                        );
                        if ((this.events.next(a), Nv(s))) {
                          const u = n.urlHandlingStrategy.merge(
                              s.url,
                              n.rawUrlTree
                            ),
                            l = {
                              skipLocationChange: r.extras.skipLocationChange,
                              replaceUrl:
                                "eager" === n.urlUpdateStrategy || Xv(r.source),
                            };
                          n.scheduleNavigation(u, Bo, null, l, {
                            resolve: r.resolve,
                            reject: r.reject,
                            promise: r.promise,
                          });
                        } else r.resolve(!1);
                      } else {
                        n.restoreHistory(r, !0);
                        const a = new vc(
                          r.id,
                          this.urlSerializer.serialize(r.extractedUrl),
                          s,
                          r.targetSnapshot ?? void 0
                        );
                        this.events.next(a);
                        try {
                          r.resolve(n.errorHandler(s));
                        } catch (u) {
                          r.reject(u);
                        }
                      }
                      return It;
                    })
                  );
                })
              )
            );
          }
          cancelNavigationTransition(n, r, o) {
            const i = new ks(
              n.id,
              this.urlSerializer.serialize(n.extractedUrl),
              r,
              o
            );
            this.events.next(i), n.resolve(!1);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = P({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      function Xv(e) {
        return e !== Bo;
      }
      let Jv = (() => {
          class e {
            buildTitle(n) {
              let r,
                o = n.root;
              for (; void 0 !== o; )
                (r = this.getResolvedTitleForRoute(o) ?? r),
                  (o = o.children.find((i) => i.outlet === k));
              return r;
            }
            getResolvedTitleForRoute(n) {
              return n.data[Lo];
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = P({
              token: e,
              factory: function () {
                return z(sN);
              },
              providedIn: "root",
            })),
            e
          );
        })(),
        sN = (() => {
          class e extends Jv {
            constructor(n) {
              super(), (this.title = n);
            }
            updateTitle(n) {
              const r = this.buildTitle(n);
              void 0 !== r && this.title.setTitle(r);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(T(Zy));
            }),
            (e.ɵprov = P({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })(),
        aN = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = P({
              token: e,
              factory: function () {
                return z(lN);
              },
              providedIn: "root",
            })),
            e
          );
        })();
      class uN {
        shouldDetach(t) {
          return !1;
        }
        store(t, n) {}
        shouldAttach(t) {
          return !1;
        }
        retrieve(t) {
          return null;
        }
        shouldReuseRoute(t, n) {
          return t.routeConfig === n.routeConfig;
        }
      }
      let lN = (() => {
        class e extends uN {}
        return (
          (e.ɵfac = (function () {
            let t;
            return function (r) {
              return (
                t ||
                (t = (function af(e) {
                  return $t(() => {
                    const t = e.prototype.constructor,
                      n = t[Ut] || Oa(t),
                      r = Object.prototype;
                    let o = Object.getPrototypeOf(e.prototype).constructor;
                    for (; o && o !== r; ) {
                      const i = o[Ut] || Oa(o);
                      if (i && i !== n) return i;
                      o = Object.getPrototypeOf(o);
                    }
                    return (i) => new i();
                  });
                })(e))
              )(r || e);
            };
          })()),
          (e.ɵprov = P({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const Qs = new A("", { providedIn: "root", factory: () => ({}) });
      let dN = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = P({
              token: e,
              factory: function () {
                return z(fN);
              },
              providedIn: "root",
            })),
            e
          );
        })(),
        fN = (() => {
          class e {
            shouldProcessUrl(n) {
              return !0;
            }
            extract(n) {
              return n;
            }
            merge(n, r) {
              return n;
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = P({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })();
      function hN(e) {
        throw e;
      }
      function pN(e, t, n) {
        return t.parse("/");
      }
      const gN = {
          paths: "exact",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "exact",
        },
        mN = {
          paths: "subset",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "subset",
        };
      let tt = (() => {
        class e {
          get navigationId() {
            return this.navigationTransitions.navigationId;
          }
          get browserPageId() {
            return this.location.getState()?.ɵrouterPageId;
          }
          get events() {
            return this.navigationTransitions.events;
          }
          constructor() {
            (this.disposed = !1),
              (this.currentPageId = 0),
              (this.console = z(kb)),
              (this.isNgZoneEnabled = !1),
              (this.options = z(Qs, { optional: !0 }) || {}),
              (this.errorHandler = this.options.errorHandler || hN),
              (this.malformedUriErrorHandler =
                this.options.malformedUriErrorHandler || pN),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1),
              (this.urlHandlingStrategy = z(dN)),
              (this.routeReuseStrategy = z(aN)),
              (this.urlCreationStrategy = z(tx)),
              (this.titleStrategy = z(Jv)),
              (this.onSameUrlNavigation =
                this.options.onSameUrlNavigation || "ignore"),
              (this.paramsInheritanceStrategy =
                this.options.paramsInheritanceStrategy || "emptyOnly"),
              (this.urlUpdateStrategy =
                this.options.urlUpdateStrategy || "deferred"),
              (this.canceledNavigationResolution =
                this.options.canceledNavigationResolution || "replace"),
              (this.config = iv(z(Or, { optional: !0 }) ?? [])),
              (this.navigationTransitions = z(Zs)),
              (this.urlSerializer = z(jo)),
              (this.location = z(Ll)),
              (this.isNgZoneEnabled =
                z(de) instanceof de && de.isInAngularZone()),
              this.resetConfig(this.config),
              (this.currentUrlTree = new gn()),
              (this.rawUrlTree = this.currentUrlTree),
              (this.browserUrlTree = this.currentUrlTree),
              (this.routerState = bv(this.currentUrlTree, null)),
              this.navigationTransitions.setupNavigations(this).subscribe(
                (n) => {
                  (this.lastSuccessfulId = n.id),
                    (this.currentPageId = n.targetPageId);
                },
                (n) => {
                  this.console.warn(`Unhandled Navigation Error: ${n}`);
                }
              );
          }
          resetRootComponentType(n) {
            (this.routerState.root.component = n),
              (this.navigationTransitions.rootComponentType = n);
          }
          initialNavigation() {
            if (
              (this.setUpLocationChangeListener(),
              !this.navigationTransitions.hasRequestedNavigation)
            ) {
              const n = this.location.getState();
              this.navigateToSyncWithBrowser(this.location.path(!0), Bo, n);
            }
          }
          setUpLocationChangeListener() {
            this.locationSubscription ||
              (this.locationSubscription = this.location.subscribe((n) => {
                const r = "popstate" === n.type ? "popstate" : "hashchange";
                "popstate" === r &&
                  setTimeout(() => {
                    this.navigateToSyncWithBrowser(n.url, r, n.state);
                  }, 0);
              }));
          }
          navigateToSyncWithBrowser(n, r, o) {
            const i = { replaceUrl: !0 },
              s = o?.navigationId ? o : null;
            if (o) {
              const u = { ...o };
              delete u.navigationId,
                delete u.ɵrouterPageId,
                0 !== Object.keys(u).length && (i.state = u);
            }
            const a = this.parseUrl(n);
            this.scheduleNavigation(a, r, s, i);
          }
          get url() {
            return this.serializeUrl(this.currentUrlTree);
          }
          getCurrentNavigation() {
            return this.navigationTransitions.currentNavigation;
          }
          resetConfig(n) {
            (this.config = n.map(Tc)),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1);
          }
          ngOnDestroy() {
            this.dispose();
          }
          dispose() {
            this.navigationTransitions.complete(),
              this.locationSubscription &&
                (this.locationSubscription.unsubscribe(),
                (this.locationSubscription = void 0)),
              (this.disposed = !0);
          }
          createUrlTree(n, r = {}) {
            const {
                relativeTo: o,
                queryParams: i,
                fragment: s,
                queryParamsHandling: a,
                preserveFragment: u,
              } = r,
              l = u ? this.currentUrlTree.fragment : s;
            let c = null;
            switch (a) {
              case "merge":
                c = { ...this.currentUrlTree.queryParams, ...i };
                break;
              case "preserve":
                c = this.currentUrlTree.queryParams;
                break;
              default:
                c = i || null;
            }
            return (
              null !== c && (c = this.removeEmptyProps(c)),
              this.urlCreationStrategy.createUrlTree(
                o,
                this.routerState,
                this.currentUrlTree,
                n,
                c,
                l ?? null
              )
            );
          }
          navigateByUrl(n, r = { skipLocationChange: !1 }) {
            const o = jn(n) ? n : this.parseUrl(n),
              i = this.urlHandlingStrategy.merge(o, this.rawUrlTree);
            return this.scheduleNavigation(i, Bo, null, r);
          }
          navigate(n, r = { skipLocationChange: !1 }) {
            return (
              (function yN(e) {
                for (let t = 0; t < e.length; t++) {
                  const n = e[t];
                  if (null == n) throw new w(4008, false);
                }
              })(n),
              this.navigateByUrl(this.createUrlTree(n, r), r)
            );
          }
          serializeUrl(n) {
            return this.urlSerializer.serialize(n);
          }
          parseUrl(n) {
            let r;
            try {
              r = this.urlSerializer.parse(n);
            } catch (o) {
              r = this.malformedUriErrorHandler(o, this.urlSerializer, n);
            }
            return r;
          }
          isActive(n, r) {
            let o;
            if (((o = !0 === r ? { ...gN } : !1 === r ? { ...mN } : r), jn(n)))
              return uv(this.currentUrlTree, n, o);
            const i = this.parseUrl(n);
            return uv(this.currentUrlTree, i, o);
          }
          removeEmptyProps(n) {
            return Object.keys(n).reduce((r, o) => {
              const i = n[o];
              return null != i && (r[o] = i), r;
            }, {});
          }
          scheduleNavigation(n, r, o, i, s) {
            if (this.disposed) return Promise.resolve(!1);
            let a, u, l, c;
            return (
              s
                ? ((a = s.resolve), (u = s.reject), (l = s.promise))
                : (l = new Promise((d, f) => {
                    (a = d), (u = f);
                  })),
              (c =
                "computed" === this.canceledNavigationResolution
                  ? o && o.ɵrouterPageId
                    ? o.ɵrouterPageId
                    : i.replaceUrl || i.skipLocationChange
                    ? this.browserPageId ?? 0
                    : (this.browserPageId ?? 0) + 1
                  : 0),
              this.navigationTransitions.handleNavigationRequest({
                targetPageId: c,
                source: r,
                restoredState: o,
                currentUrlTree: this.currentUrlTree,
                currentRawUrl: this.currentUrlTree,
                rawUrl: n,
                extras: i,
                resolve: a,
                reject: u,
                promise: l,
                currentSnapshot: this.routerState.snapshot,
                currentRouterState: this.routerState,
              }),
              l.catch((d) => Promise.reject(d))
            );
          }
          setBrowserUrl(n, r) {
            const o = this.urlSerializer.serialize(n),
              i = {
                ...r.extras.state,
                ...this.generateNgRouterState(r.id, r.targetPageId),
              };
            this.location.isCurrentPathEqualTo(o) || r.extras.replaceUrl
              ? this.location.replaceState(o, "", i)
              : this.location.go(o, "", i);
          }
          restoreHistory(n, r = !1) {
            if ("computed" === this.canceledNavigationResolution) {
              const o = this.currentPageId - n.targetPageId;
              ("popstate" !== n.source &&
                "eager" !== this.urlUpdateStrategy &&
                this.currentUrlTree !==
                  this.getCurrentNavigation()?.finalUrl) ||
              0 === o
                ? this.currentUrlTree ===
                    this.getCurrentNavigation()?.finalUrl &&
                  0 === o &&
                  (this.resetState(n),
                  (this.browserUrlTree = n.currentUrlTree),
                  this.resetUrlToCurrentUrlTree())
                : this.location.historyGo(o);
            } else
              "replace" === this.canceledNavigationResolution &&
                (r && this.resetState(n), this.resetUrlToCurrentUrlTree());
          }
          resetState(n) {
            (this.routerState = n.currentRouterState),
              (this.currentUrlTree = n.currentUrlTree),
              (this.rawUrlTree = this.urlHandlingStrategy.merge(
                this.currentUrlTree,
                n.rawUrl
              ));
          }
          resetUrlToCurrentUrlTree() {
            this.location.replaceState(
              this.urlSerializer.serialize(this.rawUrlTree),
              "",
              this.generateNgRouterState(
                this.lastSuccessfulId,
                this.currentPageId
              )
            );
          }
          generateNgRouterState(n, r) {
            return "computed" === this.canceledNavigationResolution
              ? { navigationId: n, ɵrouterPageId: r }
              : { navigationId: n };
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = P({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      class eD {}
      let wN = (() => {
        class e {
          constructor(n, r, o, i, s) {
            (this.router = n),
              (this.injector = o),
              (this.preloadingStrategy = i),
              (this.loader = s);
          }
          setUpPreloading() {
            this.subscription = this.router.events
              .pipe(
                dn((n) => n instanceof $n),
                Ln(() => this.preload())
              )
              .subscribe(() => {});
          }
          preload() {
            return this.processRoutes(this.injector, this.router.config);
          }
          ngOnDestroy() {
            this.subscription && this.subscription.unsubscribe();
          }
          processRoutes(n, r) {
            const o = [];
            for (const i of r) {
              i.providers &&
                !i._injector &&
                (i._injector = ns(i.providers, n, `Route: ${i.path}`));
              const s = i._injector ?? n,
                a = i._loadedInjector ?? s;
              ((i.loadChildren && !i._loadedRoutes && void 0 === i.canLoad) ||
                (i.loadComponent && !i._loadedComponent)) &&
                o.push(this.preloadConfig(s, i)),
                (i.children || i._loadedRoutes) &&
                  o.push(this.processRoutes(a, i.children ?? i._loadedRoutes));
            }
            return De(o).pipe(Vn());
          }
          preloadConfig(n, r) {
            return this.preloadingStrategy.preload(r, () => {
              let o;
              o =
                r.loadChildren && void 0 === r.canLoad
                  ? this.loader.loadChildren(n, r)
                  : S(null);
              const i = o.pipe(
                Se((s) =>
                  null === s
                    ? S(void 0)
                    : ((r._loadedRoutes = s.routes),
                      (r._loadedInjector = s.injector),
                      this.processRoutes(s.injector ?? n, s.routes))
                )
              );
              return r.loadComponent && !r._loadedComponent
                ? De([i, this.loader.loadComponent(r)]).pipe(Vn())
                : i;
            });
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(T(tt), T(xm), T(Wt), T(eD), T(Pc));
          }),
          (e.ɵprov = P({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const Lc = new A("");
      let tD = (() => {
        class e {
          constructor(n, r, o, i, s = {}) {
            (this.urlSerializer = n),
              (this.transitions = r),
              (this.viewportScroller = o),
              (this.zone = i),
              (this.options = s),
              (this.lastId = 0),
              (this.lastSource = "imperative"),
              (this.restoredId = 0),
              (this.store = {}),
              (s.scrollPositionRestoration =
                s.scrollPositionRestoration || "disabled"),
              (s.anchorScrolling = s.anchorScrolling || "disabled");
          }
          init() {
            "disabled" !== this.options.scrollPositionRestoration &&
              this.viewportScroller.setHistoryScrollRestoration("manual"),
              (this.routerEventsSubscription = this.createScrollEvents()),
              (this.scrollEventsSubscription = this.consumeScrollEvents());
          }
          createScrollEvents() {
            return this.transitions.events.subscribe((n) => {
              n instanceof yc
                ? ((this.store[this.lastId] =
                    this.viewportScroller.getScrollPosition()),
                  (this.lastSource = n.navigationTrigger),
                  (this.restoredId = n.restoredState
                    ? n.restoredState.navigationId
                    : 0))
                : n instanceof $n &&
                  ((this.lastId = n.id),
                  this.scheduleScrollEvent(
                    n,
                    this.urlSerializer.parse(n.urlAfterRedirects).fragment
                  ));
            });
          }
          consumeScrollEvents() {
            return this.transitions.events.subscribe((n) => {
              n instanceof Ev &&
                (n.position
                  ? "top" === this.options.scrollPositionRestoration
                    ? this.viewportScroller.scrollToPosition([0, 0])
                    : "enabled" === this.options.scrollPositionRestoration &&
                      this.viewportScroller.scrollToPosition(n.position)
                  : n.anchor && "enabled" === this.options.anchorScrolling
                  ? this.viewportScroller.scrollToAnchor(n.anchor)
                  : "disabled" !== this.options.scrollPositionRestoration &&
                    this.viewportScroller.scrollToPosition([0, 0]));
            });
          }
          scheduleScrollEvent(n, r) {
            this.zone.runOutsideAngular(() => {
              setTimeout(() => {
                this.zone.run(() => {
                  this.transitions.events.next(
                    new Ev(
                      n,
                      "popstate" === this.lastSource
                        ? this.store[this.restoredId]
                        : null,
                      r
                    )
                  );
                });
              }, 0);
            });
          }
          ngOnDestroy() {
            this.routerEventsSubscription?.unsubscribe(),
              this.scrollEventsSubscription?.unsubscribe();
          }
        }
        return (
          (e.ɵfac = function (n) {
            !(function kh() {
              throw new Error("invalid");
            })();
          }),
          (e.ɵprov = P({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      var nt = (() => (
        ((nt = nt || {})[(nt.COMPLETE = 0)] = "COMPLETE"),
        (nt[(nt.FAILED = 1)] = "FAILED"),
        (nt[(nt.REDIRECTING = 2)] = "REDIRECTING"),
        nt
      ))();
      const Fr = !1;
      function mn(e, t) {
        return { ɵkind: e, ɵproviders: t };
      }
      const kc = new A("", { providedIn: "root", factory: () => !1 });
      function rD() {
        const e = z(Zt);
        return (t) => {
          const n = e.get(ls);
          if (t !== n.components[0]) return;
          const r = e.get(tt),
            o = e.get(oD);
          1 === e.get(jc) && r.initialNavigation(),
            e.get(iD, null, M.Optional)?.setUpPreloading(),
            e.get(Lc, null, M.Optional)?.init(),
            r.resetRootComponentType(n.componentTypes[0]),
            o.closed || (o.next(), o.unsubscribe());
        };
      }
      const oD = new A(Fr ? "bootstrap done indicator" : "", {
          factory: () => new kt(),
        }),
        jc = new A(Fr ? "initial navigation" : "", {
          providedIn: "root",
          factory: () => 1,
        });
      function SN() {
        let e = [];
        return (
          (e = Fr
            ? [
                {
                  provide: Fi,
                  multi: !0,
                  useFactory: () => {
                    const t = z(tt);
                    return () =>
                      t.events.subscribe((n) => {
                        console.group?.(`Router Event: ${n.constructor.name}`),
                          console.log(
                            (function KR(e) {
                              if (!("type" in e))
                                return `Unknown Router Event: ${e.constructor.name}`;
                              switch (e.type) {
                                case 14:
                                  return `ActivationEnd(path: '${
                                    e.snapshot.routeConfig?.path || ""
                                  }')`;
                                case 13:
                                  return `ActivationStart(path: '${
                                    e.snapshot.routeConfig?.path || ""
                                  }')`;
                                case 12:
                                  return `ChildActivationEnd(path: '${
                                    e.snapshot.routeConfig?.path || ""
                                  }')`;
                                case 11:
                                  return `ChildActivationStart(path: '${
                                    e.snapshot.routeConfig?.path || ""
                                  }')`;
                                case 8:
                                  return `GuardsCheckEnd(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}', state: ${e.state}, shouldActivate: ${e.shouldActivate})`;
                                case 7:
                                  return `GuardsCheckStart(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}', state: ${e.state})`;
                                case 2:
                                  return `NavigationCancel(id: ${e.id}, url: '${e.url}')`;
                                case 16:
                                  return `NavigationSkipped(id: ${e.id}, url: '${e.url}')`;
                                case 1:
                                  return `NavigationEnd(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}')`;
                                case 3:
                                  return `NavigationError(id: ${e.id}, url: '${e.url}', error: ${e.error})`;
                                case 0:
                                  return `NavigationStart(id: ${e.id}, url: '${e.url}')`;
                                case 6:
                                  return `ResolveEnd(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}', state: ${e.state})`;
                                case 5:
                                  return `ResolveStart(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}', state: ${e.state})`;
                                case 10:
                                  return `RouteConfigLoadEnd(path: ${e.route.path})`;
                                case 9:
                                  return `RouteConfigLoadStart(path: ${e.route.path})`;
                                case 4:
                                  return `RoutesRecognized(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}', state: ${e.state})`;
                                case 15:
                                  return `Scroll(anchor: '${
                                    e.anchor
                                  }', position: '${
                                    e.position
                                      ? `${e.position[0]}, ${e.position[1]}`
                                      : null
                                  }')`;
                              }
                            })(n)
                          ),
                          console.log(n),
                          console.groupEnd?.();
                      });
                  },
                },
              ]
            : []),
          mn(1, e)
        );
      }
      const iD = new A(Fr ? "router preloader" : "");
      function bN(e) {
        return mn(0, [
          { provide: iD, useExisting: wN },
          { provide: eD, useExisting: e },
        ]);
      }
      const Yo = !1,
        sD = new A(
          Yo ? "router duplicate forRoot guard" : "ROUTER_FORROOT_GUARD"
        ),
        MN = [
          Ll,
          { provide: jo, useClass: dc },
          tt,
          zo,
          {
            provide: xr,
            useFactory: function nD(e) {
              return e.routerState.root;
            },
            deps: [tt],
          },
          Pc,
          Yo ? { provide: kc, useValue: !0 } : [],
        ];
      function TN() {
        return new $m("Router", tt);
      }
      let aD = (() => {
        class e {
          constructor(n) {}
          static forRoot(n, r) {
            return {
              ngModule: e,
              providers: [
                MN,
                Yo && r?.enableTracing ? SN().ɵproviders : [],
                { provide: Or, multi: !0, useValue: n },
                {
                  provide: sD,
                  useFactory: NN,
                  deps: [[tt, new to(), new no()]],
                },
                { provide: Qs, useValue: r || {} },
                r?.useHash
                  ? { provide: Fn, useClass: IM }
                  : { provide: Fn, useClass: uy },
                {
                  provide: Lc,
                  useFactory: () => {
                    const e = z(WT),
                      t = z(de),
                      n = z(Qs),
                      r = z(Zs),
                      o = z(jo);
                    return (
                      n.scrollOffset && e.setOffset(n.scrollOffset),
                      new tD(o, r, e, t, n)
                    );
                  },
                },
                r?.preloadingStrategy
                  ? bN(r.preloadingStrategy).ɵproviders
                  : [],
                { provide: $m, multi: !0, useFactory: TN },
                r?.initialNavigation ? PN(r) : [],
                [
                  { provide: uD, useFactory: rD },
                  { provide: jm, multi: !0, useExisting: uD },
                ],
              ],
            };
          }
          static forChild(n) {
            return {
              ngModule: e,
              providers: [{ provide: Or, multi: !0, useValue: n }],
            };
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(T(sD, 8));
          }),
          (e.ɵmod = Cn({ type: e })),
          (e.ɵinj = rn({ imports: [bc] })),
          e
        );
      })();
      function NN(e) {
        if (Yo && e)
          throw new w(
            4007,
            "The Router was provided more than once. This can happen if 'forRoot' is used outside of the root injector. Lazy loaded modules should use RouterModule.forChild() instead."
          );
        return "guarded";
      }
      function PN(e) {
        return [
          "disabled" === e.initialNavigation
            ? mn(3, [
                {
                  provide: ss,
                  multi: !0,
                  useFactory: () => {
                    const t = z(tt);
                    return () => {
                      t.setUpLocationChangeListener();
                    };
                  },
                },
                { provide: jc, useValue: 2 },
              ]).ɵproviders
            : [],
          "enabledBlocking" === e.initialNavigation
            ? mn(2, [
                { provide: jc, useValue: 0 },
                {
                  provide: ss,
                  multi: !0,
                  deps: [Zt],
                  useFactory: (t) => {
                    const n = t.get(_M, Promise.resolve());
                    return () =>
                      n.then(
                        () =>
                          new Promise((r) => {
                            const o = t.get(tt),
                              i = t.get(oD);
                            (function CN(e, t) {
                              e.events
                                .pipe(
                                  dn(
                                    (n) =>
                                      n instanceof $n ||
                                      n instanceof ks ||
                                      n instanceof vc ||
                                      n instanceof js
                                  ),
                                  H((n) =>
                                    n instanceof $n || n instanceof js
                                      ? nt.COMPLETE
                                      : n instanceof ks &&
                                        (0 === n.code || 1 === n.code)
                                      ? nt.REDIRECTING
                                      : nt.FAILED
                                  ),
                                  dn((n) => n !== nt.REDIRECTING),
                                  Fo(1)
                                )
                                .subscribe(() => {
                                  t();
                                });
                            })(o, () => {
                              r(!0);
                            }),
                              (t.get(Zs).afterPreactivation = () => (
                                r(!0), i.closed ? S(void 0) : i
                              )),
                              o.initialNavigation();
                          })
                      );
                  },
                },
              ]).ɵproviders
            : [],
        ];
      }
      const uD = new A(Yo ? "Router Initializer" : ""),
        FN = [];
      let LN = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Cn({ type: e })),
            (e.ɵinj = rn({ imports: [aD.forRoot(FN), aD] })),
            e
          );
        })(),
        kN = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵcmp = zr({
              type: e,
              selectors: [["app-song"]],
              decls: 7,
              vars: 0,
              consts: [[1, "song"]],
              template: function (n, r) {
                1 & n &&
                  (W(0, "div", 0)(1, "p"),
                  X(2, "01"),
                  q(),
                  W(3, "p"),
                  X(4, "Dictator - Rei Ami"),
                  q(),
                  W(5, "p"),
                  X(6, "3:01"),
                  q()());
              },
              styles: [
                ".song[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:baseline;align-items:center;padding:0;gap:12px;align-self:stretch}",
              ],
            })),
            e
          );
        })(),
        jN = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵcmp = zr({
              type: e,
              selectors: [["app-receipt"]],
              decls: 74,
              vars: 0,
              consts: [
                [1, "container_receiptfy"],
                [1, "receiptfy_header"],
                [1, "receiptfy_body"],
                [1, "receiptfy_order"],
                [1, "receiptfy_timestamp"],
                [1, "receiptfy_list_header"],
                [1, "receiptfy_list"],
                [1, "receiptfy_item_count"],
                [1, "receiptfy_total"],
                [1, "receiptfy_card"],
                [1, "receiptfy_auth"],
                [1, "receiptfy_card_holder"],
              ],
              template: function (n, r) {
                1 & n &&
                  (W(0, "div", 0)(1, "div", 1)(2, "h1"),
                  X(3, "Receipt"),
                  q(),
                  W(4, "h3"),
                  X(5, "Top Track This Mouth"),
                  q()(),
                  W(6, "div", 2)(7, "div", 3)(8, "p"),
                  X(9, "ORDER"),
                  q(),
                  W(10, "p"),
                  X(11, "#0001"),
                  q(),
                  W(12, "p"),
                  X(13, "for"),
                  q(),
                  W(14, "p"),
                  X(15, "Felipemaxplay"),
                  q()(),
                  W(16, "div", 4)(17, "p"),
                  X(18, "Monday"),
                  q(),
                  W(19, "p"),
                  X(20, "September"),
                  q(),
                  W(21, "p"),
                  X(22, "21"),
                  q(),
                  W(23, "p"),
                  X(24, "2023"),
                  q()(),
                  W(25, "div", 5)(26, "p"),
                  X(27, "Qtd"),
                  q(),
                  W(28, "p"),
                  X(29, "Item"),
                  q(),
                  W(30, "p"),
                  X(31, "Amt"),
                  q()(),
                  W(32, "div", 6),
                  yo(33, "app-song")(34, "app-song")(35, "app-song")(
                    36,
                    "app-song"
                  )(37, "app-song")(38, "app-song")(39, "app-song")(
                    40,
                    "app-song"
                  )(41, "app-song")(42, "app-song"),
                  q(),
                  W(43, "div", 7)(44, "p"),
                  X(45, "Item Count:"),
                  q(),
                  W(46, "p"),
                  X(47, "10"),
                  q()(),
                  W(48, "div", 8)(49, "p"),
                  X(50, "Total:"),
                  q(),
                  W(51, "p"),
                  X(52, "30:10"),
                  q()(),
                  W(53, "div", 9)(54, "p"),
                  X(55, "Card:"),
                  q(),
                  W(56, "p"),
                  X(57, "****"),
                  q(),
                  W(58, "p"),
                  X(59, "****"),
                  q(),
                  W(60, "p"),
                  X(61, "****"),
                  q(),
                  W(62, "p"),
                  X(63, "2023"),
                  q()(),
                  W(64, "div", 10)(65, "p"),
                  X(66, "Auth Code:"),
                  q(),
                  W(67, "p"),
                  X(68, "123420"),
                  q()(),
                  W(69, "div", 11)(70, "p"),
                  X(71, "Cardholder:"),
                  q(),
                  W(72, "p"),
                  X(73, "Felipemaxplay"),
                  q()()()());
              },
              dependencies: [kN],
              styles: [
                ".container_receiptfy[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:center;align-items:center;padding:30px 20px;gap:30px;max-width:450px;max-height:850px;margin:0 auto;background-image:url(plano-de-fundo-texturizado-de-papel-de-espaco-de-design.4e28e1e07a00f575.jpg)}.receiptfy_header[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:center;align-items:center;padding:0;gap:20px;align-self:stretch}.receiptfy_body[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:center;align-items:center;padding:0;gap:10px}.receiptfy_order[_ngcontent-%COMP%], .receiptfy_timestamp[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:baseline;align-items:center;padding:0;gap:10px;align-self:stretch}.receiptfy_list_header[_ngcontent-%COMP%]{box-sizing:border-box;display:flex;flex-direction:row;align-items:center;padding:0;gap:12px;border-width:2px 0px;border-style:solid;border-color:#000;align-self:stretch}.receiptfy_list[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:center;align-items:flex-start;padding:0;gap:10px;align-self:stretch}.receiptfy_item_count[_ngcontent-%COMP%]{box-sizing:border-box;display:flex;flex-direction:row;align-items:center;padding:0;gap:10px;border-top:2px solid #000000;align-self:stretch}.receiptfy_total[_ngcontent-%COMP%]{box-sizing:border-box;display:flex;flex-direction:row;align-items:center;padding:0;gap:10px;border-bottom:2px solid #000000;align-self:stretch}.receiptfy_card[_ngcontent-%COMP%], .receiptfy_auth[_ngcontent-%COMP%]{display:flex;flex-direction:row;align-items:center;padding:0;gap:10px;align-self:stretch}.receiptfy_card_holder[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:baseline;align-items:center;padding:0;gap:10px;align-self:stretch}",
              ],
            })),
            e
          );
        })(),
        $N = (() => {
          class e {
            constructor() {
              this.title = "clone-receiptfy";
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵcmp = zr({
              type: e,
              selectors: [["app-root"]],
              decls: 2,
              vars: 0,
              template: function (n, r) {
                1 & n && yo(0, "app-receipt")(1, "router-outlet");
              },
              dependencies: [Sc, jN],
            })),
            e
          );
        })(),
        VN = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Cn({ type: e, bootstrap: [$N] })),
            (e.ɵinj = rn({ imports: [zA, LN] })),
            e
          );
        })();
      HA()
        .bootstrapModule(VN)
        .catch((e) => console.error(e));
    },
  },
  (te) => {
    te((te.s = 693));
  },
]);
