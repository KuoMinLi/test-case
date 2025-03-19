const STORAGE_DATA = {
  config: {
    background: "/test-case/images/backgrounds/mobile-bg.png",
    // background
    cardStart: "/test-case/images/backgrounds/mobile-start-visual.jpg",
    cardLoading: "/test-case/images/backgrounds/mobile-loading-bg.png",
    cardQuestion: "/test-case/images/backgrounds/question-bg.png",
    cardQuestion_1: "/test-case/images/backgrounds/question-bg-1.png",
    cardQuestion_2: "/test-case/images/backgrounds/question-bg-2.png",
    cardQuestion_3: "/test-case/images/backgrounds/question-bg-3.png",
    cardQuestion_4: "/test-case/images/backgrounds/question-bg-4.png",
    cardQuestion_5: "/test-case/images/backgrounds/question-bg-5.png",
    cardQuestion_6: "/test-case/images/backgrounds/question-bg-6.png",
    cardQuestion_7: "/test-case/images/backgrounds/question-bg-7.png",
    cardQuestion_8: "/test-case/images/backgrounds/question-bg-8.png",
    cardQuestion_9: "/test-case/images/backgrounds/question-bg-9.png",
    cardQuestion_10: "/test-case/images/backgrounds/question-bg-10.png",
    //result blocks
    cardResult: "/test-case/images/result/結果頁底圖-(長).png",
    formBlock: "/test-case/images/form-block.png",
    wash_share: "/test-case/images/result/wash-share-clean.png",
    clickToParticipateBtn: "/test-case/images/buttons/click-to-participate-btn.png",
    popup: "/test-case/images/result/手機板-POP UP.png",
    //loading
    loadingVisual: "/test-case/images/backgrounds/desktop-loading-visual.png",
    loadingCaption: "/test-case/images/backgrounds/desktop-loading-bar-cap.png",
    // footer
    superMediaLogoLink: "/test-case/images/footer/super-media-logo.png",
    // questions
    questions: [
      {
        id: 1,
        text: "早上進到茶水間準備倒水，遇到相識的同事們在你面前竊竊私語，你會？",
        options: [
          { letter: "a", text: "裝作沒聽到，快步離開", score: { B: 0 } },
          {
            letter: "b",
            text: "心想：蛤…他們會不會在說我壞話…",
            score: { B: 3 },
          },
          {
            letter: "c",
            text: "不管他們在討論什麼，直接加入他們",
            score: { B: 1 },
          },
        ],
      },
      {
        id: 2,
        text: "剛到位置上坐下，主管就指定你要即刻完成一個棘手任務，你會?",
        options: [
          {
            letter: "a",
            text: "沒問題！這個任務我一定可以解決",
            score: { C: 1 },
          },
          {
            letter: "b",
            text: "怕以後日子不好過，先硬著頭皮接下",
            score: { C: 3 },
          },
          { letter: "c", text: "太突然了，直接拒絕主管", score: { C: 0 } },
        ],
      },
      {
        id: 3,
        text: "好不容易完成任務了，但主管特別情緒化，硬是挑錯把你臭罵一頓，你會…",
        options: [
          {
            letter: "a",
            text: "QQ畢竟他是我的主管，默默吞下委屈",
            score: { C: 3 },
          },
          {
            letter: "b",
            text: "雖然覺得很委屈，但還是會據理力爭",
            score: { C: 1 },
          },
          {
            letter: "c",
            text: "反正我有做好份內事，不必在乎他的情緒",
            score: { C: 0 },
          },
        ],
      },
      {
        id: 4,
        text: "在年度會議上，老闆突然說：「我們明年要進軍全球市場！」，你的第一反應是…",
        options: [
          {
            letter: "a",
            text: "笑著鼓掌，但頓時覺得責任多了三倍",
            score: { A: 3 },
          },
          { letter: "b", text: "笑笑算了，每年都講一樣", score: { A: 0 } },
          {
            letter: "c",
            text: "且走且看吧！還有很多待完善的部分",
            score: { A: 1 },
          },
        ],
      },
      {
        id: 5,
        text: "果不其然，老闆無預警提出新需求並要你負責，你會...",
        options: [
          {
            letter: "a",
            text: "老闆的話怎能不理！\n笑著應對：「了解，馬上處理！」",
            score: { A: 3 },
          },
          {
            letter: "b",
            text: "笑著謙讓，並想辦法推給其他同事",
            score: { A: 1 },
          },
          {
            letter: "c",
            text: "直接對新需求提出自己的看法和意見",
            score: { A: 0 },
          },
        ],
      },
      {
        id: 6,
        text: "會議結束後，A客戶突然來電說要緊急增加需求，你會...",
        options: [
          {
            letter: "a",
            text: "立刻調整計劃，計算能做多少修改",
            score: { E: 3 },
          },
          {
            letter: "b",
            text: "忍不住翻白眼，心想「為什麼不早點說？」\n，但還是協助處理",
            score: { E: 1 },
          },
          { letter: "c", text: "婉拒客戶，說明時間無法配合", score: { E: 0 } },
        ],
      },
      {
        id: 7,
        text: "B客戶說：「我想再調整一下。」結果直接改到第12版，你會...",
        options: [
          {
            letter: "a",
            text: "直接跟客戶說這是最後一次，無法繼續配合",
            score: { E: 0 },
          },
          {
            letter: "b",
            text: "雖然很煩，但還是盡力滿足他的需求",
            score: { E: 3 },
          },
          {
            letter: "c",
            text: "與主管一同跟客戶溝通，看能否有共識",
            score: { E: 1 },
          },
        ],
      },
      {
        id: 8,
        text: "你發現同事總是壓到最後一刻才交接進度給你，你會...",
        options: [
          { letter: "a", text: "不好意思拒絕，默默扛下來", score: { B: 3 } },
          { letter: "b", text: "直接提醒同事請他下次早點交", score: { B: 0 } },
          {
            letter: "c",
            text: "這次先幫忙處理，但委婉提醒\n同事下次要注意時間",
            score: { B: 1 },
          },
        ],
      },
      {
        id: 9,
        text: "檢視這次案件的KPI，發現有成功達到目標，你會...",
        options: [
          {
            letter: "a",
            text: "今晚馬上吃個大餐，好好犒賞自己！",
            score: { D: 1 },
          },
          {
            letter: "b",
            text: "心想：「雖然過關了，但下次怎麼辦？」",
            score: { D: 3 },
          },
          { letter: "c", text: "沒什麼特別情緒", score: { D: 0 } },
        ],
      },
      {
        id: 10,
        text: "檢視了下次案件目標，發現比原先預期高出許多，這時你會...",
        options: [
          {
            letter: "a",
            text: "仔細檢視資料，找出所有能夠提升的可能性",
            score: { D: 3 },
          },
          { letter: "b", text: "沒關係啦，船到橋頭自然直", score: { D: 0 } },
          {
            letter: "c",
            text: "跟主管討論有沒有辦法降低目標",
            score: { D: 1 },
          },
        ],
      },
    ],
    buttons: {
      startButton: "/test-case/images/buttons/start-button.png",
      shareButton: "/test-case/images/buttons/share-button.png",
      restartButton: "/test-case/images/buttons/restart-button.png",
      backButton: "/test-case/images/buttons/back-button.png",
      detailsButton: "/test-case/images/buttons/details-button.png",
    },
    result: {
      outcomeHint: "/test-case/images/buttons/outcome-hint-button.png",
      resultA: "/test-case/images/result/A-boss.png",
      resultB: "/test-case/images/result/B-seeds.png",
      resultC: "/test-case/images/result/C-hotpot.png",
      resultD: "/test-case/images/result/D-egg.png",
      resultE: "/test-case/images/result/E-buffet.png",
      result0: "/test-case/images/result/O-feast.png",
    },
    links: {
      PARTICIPATE:
        "https://events.aromase.com.tw/p/scalp_dandruff-285?utm_source=website&utm_medium=scalpdandruff&utm_campaign=fever",
      PRODUCT:
        "https://www.aromase.com.tw/categories/scalp-dandruff?utm_source=website&utm_medium=scalpdandruff&utm_campaign=product",
      ctaProduct:
        "https://www.aromase.com.tw/products/5α-juniper-flaky-relief-cleasing-shampoo?utm_source=website&utm_medium=scalpdandruff&utm_campaign=product",
    },
    desktop: {
      background: "/test-case/images/backgrounds/desktop-background.png",
      cardStart: "/test-case/images/backgrounds/desktop-start-visual.png",
      cardLoading: "/test-case/images/backgrounds/desktop-loading-bg.png",
      cardQuestion: "/test-case/images/backgrounds/desktop-background.png",
      cardQuestion_1: "/test-case/images/question/desktop-visual-Q1.png",
      cardQuestion_2: "/test-case/images/question/desktop-visual-Q2.png",
      cardQuestion_3: "/test-case/images/question/desktop-visual-Q3.png",
      cardQuestion_4: "/test-case/images/question/desktop-visual-Q4.png",
      cardQuestion_5: "/test-case/images/question/desktop-visual-Q5.png",
      cardQuestion_6: "/test-case/images/question/desktop-visual-Q6.png",
      cardQuestion_7: "/test-case/images/question/desktop-visual-Q7.png",
      cardQuestion_8: "/test-case/images/question/desktop-visual-Q8.png",
      cardQuestion_9: "/test-case/images/question/desktop-visual-Q9.png",
      cardQuestion_10: "/test-case/images/question/desktop-visual-Q10.png",
      //result
      cardResult: "/test-case/images/result/desktop-background-result.png",
      formBlock: "/test-case/images/result/form-block-desktop.png",
      propaganda_01: "/test-case/images/propaganda_01_light.png",
      propaganda_02: "/test-case/images/propaganda_02_water.png",
      wash_share: "/test-case/images/result/洗後分享區@3x.png",
      clickToParticipateBtn: "/test-case/images/buttons/click-to-participate-btn.png",
      popup: "/test-case/images/result/網頁版-POP UP.png",
      buttons: {
        startButton: "/test-case/images/result/立即測驗1@3x.png",
        startButtonHover: "/test-case/images/result/立即測驗2@3x.png",
        outcomeHint: "/test-case/images/result/網頁版-04.png",
        restartButton: "/test-case/images/result/網頁版-03.png",
        shareButton: "/test-case/images/result/網頁版-05.png",
        buyButton: "/test-case/images/result/立即購買1@3x.png",
        buyButtonHover: "/test-case/images/result/立即購買2@3x.png",
        detailButton: "/test-case/images/result/詳細產品1@3x.png",
        detailButtonHover: "/test-case/images/result/詳細產品2@3x.png",
        joinButton: "/test-case/images/result/點我參加活動1@3x.png",
        joinButtonHover: "/test-case/images/result/點我參加活動2@3x.png",
        applyButton: "/test-case/images/result/立即申請試用1@3x.png",
        applyButtonHover: "/test-case/images/result/立即申請試用2@3x.png",
      },
    },
  },
};

export default STORAGE_DATA;
