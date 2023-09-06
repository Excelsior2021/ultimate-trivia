;(() => {
  "use strict"
  ;({
    311: function () {
      var e =
        (this && this.__awaiter) ||
        function (e, t, a, n) {
          return new (a || (a = Promise))(function (s, d) {
            function i(e) {
              try {
                o(n.next(e))
              } catch (e) {
                d(e)
              }
            }
            function c(e) {
              try {
                o(n.throw(e))
              } catch (e) {
                d(e)
              }
            }
            function o(e) {
              var t
              e.done
                ? s(e.value)
                : ((t = e.value),
                  t instanceof a
                    ? t
                    : new a(function (e) {
                        e(t)
                      })).then(i, c)
            }
            o((n = n.apply(e, t || [])).next())
          })
        }
      const t = document.getElementById("categories"),
        a = document.getElementById("form"),
        n = document.getElementById("results"),
        s = document.getElementById("game"),
        d = document.getElementById("game-reset"),
        i = document.getElementById("message")
      let c,
        o = 0,
        l = 0,
        r = 0,
        m = 0
      a.addEventListener("submit", e => {
        e.preventDefault(),
          (s.innerHTML = ""),
          (n.innerHTML = ""),
          (o = 0),
          (l = 0),
          (r = 0),
          (m = 0),
          u()
      })
      const u = () =>
          e(void 0, void 0, void 0, function* () {
            const e = a.questions_num.value
            c = parseInt(e)
            const t = a.categories.value,
              o = a.difficulty.value,
              l = a.question_type.value
            try {
              const c = yield fetch(
                  `https://opentdb.com/api.php?amount=${e}&category=${t}&difficulty=${o}&type=${l}`
                ),
                { results: r, response_code: m } = yield c.json()
              a.classList.add("form--hidden"),
                s.classList.remove("game--hidden"),
                s.classList.add("game--format"),
                n.classList.add("results--hidden"),
                d.classList.remove("game__reset--hidden"),
                i.classList.add("message--hidden"),
                1 === m && g(),
                p(r)
            } catch (e) {
              console.log(e)
            }
          }),
        g = () => {
          const e = document.createElement("p")
          e.classList.add("no-data__message"),
            (e.innerText =
              "There were no questions for your chosen settings. Try reducing the number of questions in the settings.")
          const t = document.createElement("button")
          ;(t.innerText = "go back"),
            t.classList.add("no-data__button"),
            t.classList.add("game__navigate"),
            t.addEventListener("click", C),
            s.appendChild(e),
            s.appendChild(t)
        },
        p = e => {
          e.forEach((e, t) => {
            t += 1
            const a = [],
              n = document.createElement("div")
            n.classList.add("game__questions"),
              1 !== t && n.classList.add("game__questions--hidden")
            const d = document.createElement("h2")
            d.classList.add("game__title"), (d.innerText = `Question ${t}`)
            const i = document.createElement("p")
            i.classList.add("game__question")
            const o = _(e.question)
            ;(i.innerText = o),
              e.incorrect_answers.forEach(e => {
                const t = document.createElement("input")
                ;(t.type = "button"), t.classList.add("game__answer")
                const n = _(e)
                ;(t.name = "false"),
                  (t.value = n),
                  (t.innerText = n),
                  t.addEventListener("click", e => v(e, a)),
                  a.push(t)
              })
            const l = document.createElement("input")
            ;(l.type = "button"), l.classList.add("game__answer")
            const r = _(e.correct_answer)
            ;(l.name = "true"),
              (l.value = r),
              l.addEventListener("click", e => v(e, a)),
              a.push(l)
            const m = h(a)
            n.appendChild(d), n.appendChild(i), m.forEach(e => n.appendChild(e))
            const u = document.createElement("div"),
              g = document.createElement("div"),
              p = document.createElement("div")
            if ((u.classList.add("game__navigate-container"), 1 !== t)) {
              const e = document.createElement("input")
              e.classList.add("game__navigate"),
                e.classList.add("game__navigate--prev"),
                (e.type = "button"),
                (e.value = "prev"),
                e.addEventListener("click", f),
                g.appendChild(e),
                t === c && e.classList.add("game__navigate--prev--format")
            }
            if (t !== c) {
              const e = document.createElement("input")
              e.classList.add("game__navigate"),
                e.classList.add("game__navigate--next"),
                (e.type = "button"),
                (e.value = "next"),
                e.addEventListener("click", L),
                g.appendChild(e)
            }
            const y = document.createElement("input")
            y.classList.add("game__navigate"),
              y.classList.add("game__navigate--results"),
              (y.type = "button"),
              (y.value = "view results"),
              y.addEventListener("click", E),
              p.appendChild(y),
              u.appendChild(g),
              u.appendChild(p),
              n.appendChild(u),
              s.appendChild(n)
          })
        },
        _ = e =>
          e
            .replace(/&amp;/g, "&")
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">")
            .replace(/&quot;/g, '"')
            .replace(/&#039;/g, "'")
            .replace(/&pi;/g, "π")
            .replace(/&Delta;/g, "Δ")
            .replace(/&Deg;/g, "°")
            .replace(/&ldquo;/g, "“")
            .replace(/&rdquo;/g, "”")
            .replace(/&shy;/g, "-"),
        h = e => {
          for (let t = e.length - 1; t > 0; t--) {
            const a = Math.floor(Math.random() * (t + 1)),
              n = e[t]
            ;(e[t] = e[a]), (e[a] = n)
          }
          return e
        },
        v = (e, t) => {
          r += 1
          const a = e.target
          if ("true" === a.name)
            a.classList.add("game__answer--correct"), (o += 1)
          else {
            a.classList.add("game__answer--incorrect"), (l += 1)
            for (const e of t)
              if ("true" === e.name) {
                e.classList.add("game__answer--correct")
                break
              }
          }
          if (
            (a.parentElement.classList.add("game__questions--unclickable"),
            r === c)
          ) {
            const e = document.getElementsByClassName("game__navigate--results")
            for (const t of e) t.classList.add("game__navigate--results--show")
            y()
          }
        },
        L = () => {
          const e = document.getElementById("game")
          e.children[m].classList.add("game__questions--hidden"),
            e.children[m + 1].classList.remove("game__questions--hidden"),
            (m += 1)
        },
        f = () => {
          const e = document.getElementById("game")
          e.children[m].classList.add("game__questions--hidden"),
            e.children[m - 1].classList.remove("game__questions--hidden"),
            (m -= 1)
        },
        E = () => {
          s.classList.add("game--hidden"), n.classList.remove("results--hidden")
        },
        y = () => {
          d.classList.add("game__reset--hidden")
          const e = b(),
            t = document.createElement("p")
          t.classList.add("results__statement"),
            (t.innerText = `You got ${o} out of ${c} questions right.`),
            t.classList.add("results__statement--format")
          const a = document.createElement("p")
          a.classList.add("results__feedback"), (a.innerText = e)
          const s = document.createElement("input")
          s.classList.add("results__button"),
            s.classList.add("game__navigate"),
            (s.type = "button"),
            (s.value = "play again"),
            s.addEventListener("click", C)
          const i = document.createElement("input")
          i.classList.add("results__button"),
            i.classList.add("game__navigate"),
            (i.type = "button"),
            (i.value = "review"),
            i.addEventListener("click", k),
            n.appendChild(t),
            n.appendChild(a),
            n.appendChild(i),
            n.appendChild(s)
        },
        b = () => {
          const e = o / c
          let t
          switch (!0) {
            case e >= 0.9:
              t = "Exceptional!"
              break
            case e >= 0.7:
              t = "Very good! Well done."
              break
            case e >= 0.5:
              t = "Not bad! See if you could do better."
              break
            case e >= 0.2:
              t = "hmmm, a bit more studying wouldn't hurt."
              break
            default:
              t = "Don't bother playing again!"
          }
          return t
        },
        C = () => {
          ;(n.innerHTML = ""),
            (s.innerHTML = ""),
            s.classList.remove("game--format"),
            a.classList.remove("form--hidden"),
            i.classList.remove("message--hidden")
        }
      d.addEventListener("click", C)
      const k = () => {
        n.classList.add("results--hidden"), s.classList.remove("game--hidden")
      }
      var q
      ;(q = Math.floor(2 * Math.random()) ? "visitor" : "VISITOR"),
        console.log(q),
        pendo.initialize({
          visitor: { id: q || "VISITOR-UNIQUE-ID", role: "user" },
        }),
        e(void 0, void 0, void 0, function* () {
          try {
            const e = yield fetch("https://opentdb.com/api_category.php"),
              { trivia_categories: a } = yield e.json()
            a.map((e, a) => {
              a += 9
              const n = document.createElement("option")
              ;(n.value = a.toString()),
                (n.innerText = e.name),
                t.appendChild(n)
            })
          } catch (e) {
            console.log(e)
          }
        })
    },
  })[311]()
})()
