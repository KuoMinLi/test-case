// Test.js
import React, {
  forwardRef,
  memo,
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "https://esm.sh/react@18.2.0";

import ReactDOM from "https://esm.sh/react-dom@18.2.0";
import STORAGE_DATA from "./js/constantLocal.js";

const handlePostData = async (data, from_quiz) => {
  try {
    if (Object.keys(data).length === 0) return;

    const formatData = {
      ...data,
      from_quiz,
    };

    const testServer = "https://test-event.ttshow.tw/";
    const Server = "https://event.ttshow.tw/";

    const postUrl = `${testServer}api/scalp_dandruff/info`;

    const res = await axios.post(postUrl, formatData);
    if (res.status === 200) {
      alert("申請成功！我們將盡快與您聯絡。");
    }
    if (res.status === 400) {
      alert("申請失敗，表單輸入有誤。");
    }
    return res;
  } catch (error) {
    console.error(error);
    alert("申請失敗，請稍後再試。");
    throw error;
  }
};

const App = ({ onClose }) => {
  const [staticJson, setStaticJson] = useState(STORAGE_DATA);
  console.log(staticJson);
  const QUESTIONS = staticJson?.config?.questions || [];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);
  const [scores, setScores] = useState([]);
  const [categoryScores, setCategoryScores] = useState({
    A: 0, // 老闆
    B: 0, // 同事
    C: 0, // 主管
    D: 0, // 業績
    E: 0, // 客戶
  });

  const [highestCategory, setHighestCategory] = useState("");
  const [tiebreaker, setTiebreaker] = useState(null);

  const [resultImage, setResultImage] = useState(""); // 結果圖片
  const [isMobile, setIsMobile] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState(
    `${staticJson.config.desktop.background}`
  );

  const handleBack = useCallback(() => {
    setIsLoading(true);
    try {
      if (currentQuestionIndex === 0) {
        setCurrentQuestionIndex(-1);
        setScores([]);
        setCategoryScores({ A: 0, B: 0, C: 0, D: 0, E: 0 });
        setHighestCategory("");
        setTiebreaker(null);
        return;
        return;
      }

      const prevIndex = currentQuestionIndex - 1;

      // 更新分數，扣除之前這題的分數
      if (scores.length > 0) {
        const newScores = [...scores];
        const removedScore = newScores.pop();
        setScores(newScores);

        // 更新類別分數
        if (removedScore) {
          const newCategoryScores = { ...categoryScores };
          newCategoryScores[removedScore.category] -= removedScore.score;
          setCategoryScores(newCategoryScores);

          // 重新計算最高類別
          recalculateHighestCategory(newCategoryScores, newScores);
        }
      }

      setCurrentQuestionIndex(prevIndex);
    } finally {
      setIsLoading(false);
    }
  }, [currentQuestionIndex, scores, categoryScores]);

  // 幫助函數：重新計算最高類別和決勝
  const recalculateHighestCategory = (newCategoryScores, newScores) => {
    let highest = "";
    let highestScore = -1;

    for (const [cat, catScore] of Object.entries(newCategoryScores)) {
      if (catScore > highestScore) {
        highest = cat;
        highestScore = catScore;
      }
    }

    // 檢查是否有平局
    const tiedCategories = Object.entries(newCategoryScores)
      .filter(([_, score]) => score === highestScore && score > 0)
      .map(([cat, _]) => cat);

    let newTiebreaker = null;
    if (tiedCategories.length > 1) {
      // 遍歷所有得分記錄，找到第一個得到高分的類別
      for (const record of newScores) {
        if (tiedCategories.includes(record.category) && record.score >= 3) {
          newTiebreaker = record.category;
          break;
        }
      }
    }

    setHighestCategory(highest);
    setTiebreaker(newTiebreaker);
  };

  // 完全重置所有狀態
  const handleRestart = useCallback(async () => {
    setIsLoading(true);
    try {
      setCurrentQuestionIndex(-1);
      setScores([]);
      setCategoryScores({ A: 0, B: 0, C: 0, D: 0, E: 0 });
      setHighestCategory("");
      setTiebreaker(null);
      setResultImage("");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleStart = async () => {
    setIsLoading(true);
    try {
      setCurrentQuestionIndex(0);
      setScores([]);
      setCategoryScores({ A: 0, B: 0, C: 0, D: 0, E: 0 });
      setHighestCategory("");
      setTiebreaker(null);
      setResultImage("");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  // 根據最高類別確定結果圖片
  const determineResultImage = useCallback(
    (highestCategory, tiebreakerCategory) => {
      // 檢查是否每個類別都有分數，並且分布相當平均
      const categories = Object.keys(categoryScores);
      const hasAllCategories = categories.every(
        (cat) => categoryScores[cat] > 0
      );
      const maxScore = Math.max(...Object.values(categoryScores));
      const minScore = Math.min(...Object.values(categoryScores));

      // 如果所有類別都有分數，並且最高和最低分的差距小於某個閾值（例如 4 分），則視為"都有"類型
      if (hasAllCategories && maxScore - minScore <= 4) {
        return "/test-case/images/result/O-feast.png"; // 甚麼都有的辦桌流水席
      }

      // 依據最高分類別（或平局情況下的決勝類別）返回相應的結果圖片
      const finalCategory = tiebreakerCategory || highestCategory;
      switch (finalCategory) {
        case "A":
          return `${staticJson.config.result.resultA}`; // 老闆畫的大餅
        case "B":
          return `${staticJson.config.result.resultB}`; // 同事嗑的甘草瓜子
        case "C":
          return `${staticJson.config.result.resultC}`; // 主管甩的麻辣火鍋
        case "D":
          return `${staticJson.config.result.resultD}`; // 業績拿的滷鴨蛋
        case "E":
          return `${staticJson.config.result.resultE}`; // 客戶無限加點的吃到飽
        default:
          return `${staticJson.config.result.result0}`; // 預設結果
      }
    },
    [categoryScores]
  );

  const currentQuestionData = useMemo(() => {
    if (currentQuestionIndex < 0 || currentQuestionIndex >= QUESTIONS.length) {
      return null;
    }
    const question = QUESTIONS[currentQuestionIndex];
    return {
      ...question,
    };
  }, [currentQuestionIndex, QUESTIONS]);

  const handleAnswer = useCallback(
    async (choiceData, choiceLetter) => {
      setIsLoading(true);
      try {
        // 解析選擇數據，格式為 "X+Y"，例如 "A+3"
        const [category, points] = choiceData.split("+");
        const score = parseInt(points, 10);

        const newScores = [...scores, { category, score, choiceLetter }];
        setScores(newScores);

        const newCategoryScores = { ...categoryScores };
        newCategoryScores[category] += score;
        setCategoryScores(newCategoryScores);

        let highest = highestCategory;
        let highestScore = highest ? newCategoryScores[highest] : -1;

        for (const [cat, catScore] of Object.entries(newCategoryScores)) {
          if (catScore > highestScore) {
            highest = cat;
            highestScore = catScore;
          }
        }

        // 檢查是否有平局，並使用最早獲得最高分的類別作為決勝
        const tiedCategories = Object.entries(newCategoryScores)
          .filter(([_, score]) => score === highestScore)
          .map(([cat, _]) => cat);

        let newTiebreaker = tiebreaker;
        if (tiedCategories.length > 1 && !newTiebreaker) {
          for (const record of newScores) {
            if (tiedCategories.includes(record.category) && record.score >= 3) {
              newTiebreaker = record.category;
              break;
            }
          }
        }

        setHighestCategory(highest);
        setTiebreaker(newTiebreaker);

        if (currentQuestionIndex === QUESTIONS.length - 1) {
          // 如果是最後一題，計算結果並跳轉到結果頁
          // 模擬網路延遲，以顯示 Loading
          await new Promise((resolve) => setTimeout(resolve, 4000));

          const resultImg = determineResultImage(
            highest,
            newTiebreaker || highest
          );
          setResultImage(resultImg);
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [
      currentQuestionIndex,
      scores,
      categoryScores,
      highestCategory,
      tiebreaker,
      QUESTIONS.length,
      determineResultImage,
    ]
  );

  useEffect(() => {
    if (isLoading) {
      setBackgroundImage(`${staticJson.config.desktop.cardLoading}`);
    } else if (currentQuestionIndex >= QUESTIONS.length) {
      // 結果頁
      setBackgroundImage(`${staticJson.config.desktop.cardResult}`);
    } else if (currentQuestionIndex >= 0) {
      // 問題頁
      setBackgroundImage(`${staticJson.config.desktop.background}`);
    } else {
      // 開始頁或名稱輸入頁
      setBackgroundImage(`${staticJson.config.desktop.background}`);
    }

    // 將背景圖變更應用到父容器
    const gameContainer = document.getElementById("game");
    if (gameContainer) {
      gameContainer.style.backgroundImage = `url(${backgroundImage})`;
    }
  }, [currentQuestionIndex, isLoading, backgroundImage]);

  if (isLoading) {
    return <LoadingPage config={staticJson?.config} />;
  }

  if (currentQuestionIndex === -1) {
    return (
      <StartPage
        config={staticJson?.config}
        onStart={handleStart}
        currentQuestionIndex={currentQuestionIndex}
      />
    );
  }

  if (currentQuestionIndex < QUESTIONS.length && currentQuestionIndex >= 0) {
    return (
      <QuestionPage
        currentQuestion={currentQuestionData}
        onAnswer={handleAnswer}
        config={staticJson?.config}
        onBack={handleBack}
        currentScore={categoryScores}
        questionId={currentQuestionIndex + 1}
      />
    );
  }

  console.log("最終類別得分:", categoryScores);
  console.log("最高分類別:", highestCategory);
  console.log("決勝類別:", tiebreaker);

  // 測驗完成，顯示結果頁
  return (
    <div className="flex flex-col w-full">
      <main className="flex flex-col items-center">
        <section className="w-full text-center">
          <ResultPage
            resultImage={resultImage}
            categoryScores={categoryScores}
            highestCategory={highestCategory}
            tiebreaker={tiebreaker}
            config={staticJson?.config}
            onRestart={handleRestart}
          />
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-700 hover:text-black"
          >
            ✕
          </button>
        </section>
      </main>
    </div>
  );
};

const DesktopFrame = memo(({ config, currentQuestionIndex, imgType }) => {
  const backgroundImages = {
    start: config.desktop.cardStart,
    question_1: config.desktop.cardQuestion_1,
    question_2: config.desktop.cardQuestion_2,
    question_3: config.desktop.cardQuestion_3,
    question_4: config.desktop.cardQuestion_4,
    question_5: config.desktop.cardQuestion_5,
    question_6: config.desktop.cardQuestion_6,
    question_7: config.desktop.cardQuestion_7,
    question_8: config.desktop.cardQuestion_8,
    question_9: config.desktop.cardQuestion_9,
    question_10: config.desktop.cardQuestion_10,
    loading: config.desktop.cardLoading,
  };

  return (
    <div className="relative w-full h-full">
      {/* Using the same background image for all page types */}
      {Object.entries(backgroundImages).map(([type, src]) => (
        <img
          key={type}
          className={`object-contain w-full transition-opacity duration-300 ${
            imgType === type ? "opacity-100" : "opacity-0 absolute inset-0"
          }
          `}
          src={src}
          alt={`background-${type}`}
        />
      ))}
    </div>
  );
});

const CardFrame = memo(({ config, currentQuestionIndex, imgType }) => {
  console.log(imgType);

  const backgroundImages = {
    start: config.cardStart,
    question_1: config.cardQuestion_1,
    question_2: config.cardQuestion_2,
    question_3: config.cardQuestion_3,
    question_4: config.cardQuestion_4,
    question_5: config.cardQuestion_5,
    question_6: config.cardQuestion_6,
    question_7: config.cardQuestion_7,
    question_8: config.cardQuestion_8,
    question_9: config.cardQuestion_9,
    question_10: config.cardQuestion_10,
    loading: config.cardLoading,
  };

  return (
    <div className="relative w-full max-w-[430px] h-full overflow-hidden">
      {/* Using the same background image for all page types */}
      {Object.entries(backgroundImages).map(([type, src]) => (
        <img
          key={type}
          className={`object-contain w-full transition-opacity duration-300 ${
            imgType === type ? "opacity-100" : "opacity-0 absolute inset-0"
          }`}
          src={src}
          alt={`background-${type}`}
        />
      ))}
    </div>
  );
});

const StartPage = memo(({ config, onStart, currentQuestionIndex }) => {
  return (
    <div>
      <div className="flex w-full min-h-[100dvh] items-center justify-center sm:hidden">
        <img
          src={config.desktop.background}
          alt="background"
          className="absolute inset-0 object-cover w-full h-full"
        />
        <div className="relative w-full transition-all duration-300">
          <DesktopFrame
            imgType="start"
            config={config}
            currentQuestionIndex={currentQuestionIndex}
          />
          <button
            className="absolute bottom-[6.5%] left-[39%] w-[22%] h-[9.5%] rounded-full"
            onClick={onStart}
          />
        </div>
      </div>
      <div className="w-full min-h-[100dvh] items-center justify-center max-w-[430px] sm:flex hidden">
        <img
          src={config.background}
          alt="background"
          className="absolute inset-0 object-cover w-full h-full"
        />
        <div className="relative w-full transition-all duration-300">
          <CardFrame
            imgType="start"
            config={config}
            currentQuestionIndex={currentQuestionIndex}
          />
          <button
            className="absolute bottom-[10%] left-[27%] w-[46%] h-[7%] rounded-full"
            onClick={onStart}
          >
            <img
              className="start-button-float"
              src={config.buttons.startButton}
              alt="start-button-image"
            />
          </button>
        </div>
      </div>
    </div>
  );
});

const QuestionPage = memo(
  ({ currentQuestion, onAnswer, config, onBack, currentScore, questionId }) => {
    const handleButtonClick = async (score, choiceLetter) => {
      const button = document.activeElement;
      if (button) {
        button.blur(); // 移除焦點
        button.style.pointerEvents = "none"; // 防止重複點擊
        setTimeout(() => {
          button.style.pointerEvents = "auto";
        }, 300);
      }

      onAnswer(score, choiceLetter);
    };

    const handleBackClick = () => {
      // 防止連續快速點擊
      const button = document.activeElement;
      if (button) {
        button.blur();
        button.style.pointerEvents = "none";
        setTimeout(() => {
          button.style.pointerEvents = "auto";
        }, 300);
      }
      onBack();
    };

    // 根據題目 ID 獲取對應的按鈕圖片和分數
    const getButtonConfig = (questionId) => {
      switch (questionId) {
        case 1: // 第1題
          return [
            { score: "B+0", letter: "a" },
            { score: "B+3", letter: "b" },
            { score: "B+1", letter: "c" },
          ];
        case 2: // 第2題
          return [
            { score: "C+1", letter: "a" },
            { score: "C+3", letter: "b" },
            { score: "C+0", letter: "c" },
          ];
        case 3: // 第3題
          return [
            { score: "C+3", letter: "a" },
            { score: "C+1", letter: "b" },
            { score: "C+0", letter: "c" },
          ];
        case 4: // 第4題
          return [
            { score: "A+3", letter: "a" },
            { score: "A+0", letter: "b" },
            { score: "A+1", letter: "c" },
          ];
        case 5: // 第5題
          return [
            { score: "A+3", letter: "a" },
            { score: "A+1", letter: "b" },
            { score: "A+0", letter: "c" },
          ];
        case 6: // 第6題
          return [
            { score: "E+0", letter: "a" },
            { score: "E+3", letter: "b" },
            { score: "E+1", letter: "c" },
          ];
        case 7: // 第7題
          return [
            { score: "E+0", letter: "a" },
            { score: "E+3", letter: "b" },
            { score: "E+1", letter: "c" },
          ];
        case 8: // 第8題
          return [
            { score: "B+3", letter: "a" },
            { score: "B+0", letter: "b" },
            { score: "B+1", letter: "c" },
          ];
        case 9: // 第9題
          return [
            { score: "D+1", letter: "a" },
            { score: "D+3", letter: "b" },
            { score: "D+0", letter: "c" },
          ];
        case 10: // 第10題
          return [
            { score: "D+3", letter: "a" },
            { score: "D+0", letter: "b" },
            { score: "D+1", letter: "c" },
          ];
        default:
          return [];
      }
    };

    const buttons = getButtonConfig(currentQuestion?.id);

    return (
      <div>
        <div className="flex w-full min-h-[100dvh] items-center justify-center sm:hidden">
          <img
            src={config.desktop.background}
            alt="background"
            className="absolute inset-0 object-cover w-full h-full"
          />
          <div className="relative w-full transition-all duration-300">
            <div className="relative w-full h-full transition-all duration-300">
              <DesktopFrame
                imgType={"question_" + questionId}
                config={config}
              />
              <button
                onClick={handleBackClick}
                className="absolute left-1/2 w-[10%] h-[4%] transform -translate-x-1/2 bottom-[7%] "
              />
              <div className="absolute left-[27%] w-[46%] top-[55%] h-[24%] card:block hidden">
                <div className="flex flex-col items-center mt-6 h-full w-full gap-3">
                  {buttons?.map((button, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        handleButtonClick(button?.score, button?.letter)
                      }
                      onTouchEnd={(e) => e.target.blur()}
                      className="w-full rounded-full h-full"
                    />
                  ))}
                </div>
              </div>
              <div className="absolute left-[27%] w-[46%] lg:top-[58%] top-[60%] h-[24%] card:hidden block">
                <div className="flex flex-col items-center mt-6 h-full w-full gap-3">
                  {buttons?.map((button, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        handleButtonClick(button?.score, button?.letter)
                      }
                      onTouchEnd={(e) => e.target.blur()}
                      className="w-full rounded-full h-full"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full min-h-[100dvh] items-center justify-center max-w-[430px] sm:flex hidden">
          <img
            src={config.background}
            alt="background"
            className="absolute inset-0 object-cover w-full h-full"
          />
          <div className="relative w-full h-full transition-all duration-300">
            <CardFrame imgType={"question_" + questionId} config={config} />
            <button
              onClick={handleBackClick}
              className="absolute left-1/2 w-[110px]
                    transform -translate-x-1/2 bottom-[40px] z-10 flex items-center justify-center
                            text-2xl font-bold text-[#402529] hover:text-[#5a363b] 
                            hover:bg-black/5 rounded-full"
              style={{ fontFamily: "sans-serif" }}
            >
              <img
                className="back-button-slide"
                src={config?.buttons?.backButton}
                alt="back-button"
              />
            </button>
            {/* 根據題目選項不同客製化：第5題第一個選項兩行，第6題第二個選項兩行，第8題第三個選項兩行 */}
            <div
              className={`absolute left-[6%] w-[88%] ${
                [5, 6, 8].includes(currentQuestion?.id)
                  ? "top-[60.5%] h-[22%]"
                  : "top-[62.5%] h-[20%]"
              }`}
            >
              <div
                className="flex flex-col items-center mt-6 h-full w-full"
                style={{
                  gap: [5, 6, 8].includes(currentQuestion?.id)
                    ? "0.8rem"
                    : "0.75rem",
                }}
              >
                {buttons?.map((button, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      handleButtonClick(button?.score, button?.letter)
                    }
                    onTouchEnd={(e) => e.target.blur()}
                    className={`w-full rounded-full ${
                      (currentQuestion?.id === 5 && index === 0) ||
                      (currentQuestion?.id === 6 && index === 1) ||
                      (currentQuestion?.id === 8 && index === 2)
                        ? "h-[160%]"
                        : "h-full"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

const FromBlock = ({ openPopup }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    postcode: "",
    gender: "",
    age: "",
    experience: "",
    address: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validate form data
  const validateForm = () => {
    const newErrors = {};
    const namePattern = /^[\u4e00-\u9fa5a-zA-Z\s·.-]+$/;

    // Last Name validation
    if (!formData.name.trim()) {
      newErrors.name = "請輸入姓名";
    } else if (formData.name.length > 50) {
      newErrors.name = "姓名長度不可超過50個字元";
    } else if (/[<>'"&]/.test(formData.name)) {
      newErrors.name = "姓名不可包含特殊字元";
    } else if (!namePattern.test(formData.name)) {
      newErrors.name = "姓名只能包含中文、英文字母、空格、點(.)、連字號(-)";
    }

    // Phone validation - simple Taiwan format check
    if (!formData.phone.trim()) {
      newErrors.phone = "請輸入電話號碼";
    } else if (!/^(09)\d{8}$/.test(formData.phone)) {
      newErrors.phone = "請輸入完整10碼手機號";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "請輸入電子郵件";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "請輸入正確mail格式";
    } else if (formData.email.length > 30) {
      newErrors.email = "電子郵件長度不可超過30個字元";
    } else if (/[<>'"&]/.test(formData.email)) {
      newErrors.email = "電子郵件不可包含特殊字元";
    }

    // ZIP code validation
    if (!formData.postcode.trim()) {
      newErrors.postcode = "請輸入郵遞區號";
    } else if (!/^\d{3}$/.test(formData.postcode)) {
      newErrors.postcode = "郵遞區號請輸入三碼數字";
    }

    if (!formData.gender) {
      newErrors.gender = "請選取性別";
    }

    if (!formData.age) {
      newErrors.age = "請選擇年齡";
    }

    if (!formData.experience) {
      newErrors.experience = "請選擇體驗產品";
    }

    // Shipping address validation
    if (!formData.address.trim()) {
      newErrors.address = "請輸入寄送地址";
    } else if (formData.address.length > 50) {
      newErrors.address = "地址長度不可超過50個字元";
    } else if (/[<>'"&]/.test(formData.address)) {
      newErrors.address = "地址不可包含特殊字元";
    }

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();

    // If there are errors, show alert with error messages
    if (Object.keys(formErrors).length > 0) {
      let errorMessage = "請修正以下錯誤：\n";
      Object.values(formErrors).forEach((error) => {
        errorMessage += `- ${error}\n`;
      });
      alert(errorMessage);
      return;
    }

    const res = await handlePostData(formData, true);
    if (res.status === 200) {
      openPopup();
      // 清空表單
      setFormData({
        name: "",
        phone: "",
        email: "",
        postcode: "",
        gender: "",
        age: "",
        experience: "",
        address: "",
        consent: false,
      });
    }
  };

  return (
    <div className="absolute w-full h-full ">
      <div className="relative w-full h-full sm:hidden block">
        <div className="absolute top-[34%] left-[15%] w-[36%] h-[3.4%]">
          <span className="absolute top-1/2 left-3 transform -translate-y-1/2 text-black">
            {formData.name}
          </span>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            maxLength={10}
            className="absolute inset-0 opacity-0 cursor-text"
          />
        </div>
        {/* Gender selection */}
        <div className="absolute top-[34%] right-[15.7%] w-[22%] h-[3%] flex">
          <div className="w-1/2 relative">
            <span className="absolute top-1/2 left-1 transform -translate-y-1/2 text-black">
              {formData.gender === "男" ? "✓" : ""}
            </span>
            <input
              type="radio"
              name="gender"
              value="男"
              checked={formData.gender === "男"}
              onChange={handleChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
          <div className="w-1/2 relative">
            <span className="absolute top-1/2 left-1 transform -translate-y-1/2 text-black">
              {formData.gender === "女" ? "✓" : ""}
            </span>
            <input
              type="radio"
              name="gender"
              value="女"
              checked={formData.gender === "女"}
              onChange={handleChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
        </div>

        {/* Age groups */}
        <div className="absolute top-[38.4%] left-[15.5%] w-[65%] h-[3%] flex">
          <div className="w-1/4 relative">
            <span className="absolute top-1/2 left-[2px] transform -translate-y-1/2 text-black">
              {formData.age === "25以下" ? "✓" : ""}
            </span>
            <input
              type="radio"
              name="age"
              value="25以下"
              checked={formData.age === "25以下"}
              onChange={handleChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
          <div className="w-1/4 relative">
            <span className="absolute top-1/2 left-2 transform -translate-y-1/2 text-black">
              {formData.age === "26-30" ? "✓" : ""}
            </span>
            <input
              type="radio"
              name="age"
              value="26-30"
              checked={formData.age === "26-30"}
              onChange={handleChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
          <div className="w-1/4 relative">
            <span className="absolute top-1/2 left-[6px] transform -translate-y-1/2 text-black">
              {formData.age === "31-35" ? "✓" : ""}
            </span>
            <input
              type="radio"
              name="age"
              value="31-35"
              checked={formData.age === "31-35"}
              onChange={handleChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
          <div className="w-1/4 relative">
            <span className="absolute top-1/2 left-1 transform -translate-y-1/2 text-black">
              {formData.age === "36-40" ? "✓" : ""}
            </span>
            <input
              type="radio"
              name="age"
              value="36-40"
              checked={formData.age === "36-40"}
              onChange={handleChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
        </div>

        <div className="absolute top-[42.8%] left-[15.5%] w-[65%] h-[3%] flex">
          <div className="w-1/4 relative">
            <span className="absolute top-1/2 left-[2px] transform -translate-y-1/2 text-black">
              {formData.age === "41-45" ? "✓" : ""}
            </span>
            <input
              type="radio"
              name="age"
              value="41-45"
              checked={formData.age === "41-45"}
              onChange={handleChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
          <div className="w-1/4 relative">
            <span className="absolute top-1/2 left-[8px] transform -translate-y-1/2 text-black">
              {formData.age === "46-50" ? "✓" : ""}
            </span>
            <input
              type="radio"
              name="age"
              value="46-50"
              checked={formData.age === "46-50"}
              onChange={handleChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
          <div className="w-1/4 relative">
            <span className="absolute top-1/2  left-[6px] transform -translate-y-1/2 text-black">
              {formData.age === "51+" ? "✓" : ""}
            </span>
            <input
              type="radio"
              name="age"
              value="51+"
              checked={formData.age === "51+"}
              onChange={handleChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
        </div>

        {/* Phone number */}
        <div className="absolute top-[47%] left-[20%] w-[23%] h-[3%]">
          <span className="absolute top-1/2 left-4 transform -translate-y-1/2 text-black">
            {formData.phone}
          </span>
          <input
            type="tel"
            name="phone"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            maxLength={10}
            className="absolute inset-0 opacity-0 cursor-text"
            placeholder="手機號碼"
          />
        </div>

        {/* Product Type */}
        <div className="absolute top-[47%] left-[66%] w-[26%] h-[3%] flex">
          <div className="w-1/2 relative">
            <span className="absolute top-1/2 left-1 transform -translate-y-1/2 text-black">
              {formData.experience === "油屑" ? "✓" : ""}
            </span>
            <input
              type="radio"
              name="experience"
              value="油屑"
              checked={formData.experience === "油屑"}
              onChange={handleChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
          <div className="w-1/2 relative">
            <span className="absolute top-1/2 left-[8px] transform -translate-y-1/2 text-black">
              {formData.experience === "乾屑" ? "✓" : ""}
            </span>
            <input
              type="radio"
              name="experience"
              value="乾屑"
              checked={formData.experience === "乾屑"}
              onChange={handleChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
        </div>

        {/* Email */}
        <div className="absolute top-[57.2%] left-[19%] w-[72%] h-[3%]">
          <span className="absolute top-1/2 left-3 transform -translate-y-1/2 text-black">
            {formData.email}
          </span>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="absolute inset-0 opacity-0 cursor-text"
            placeholder="E-MAIL"
            maxLength={30}
          />
        </div>
        <div className="absolute top-[61.5%] left-[21.2%] w-[9.5%] h-[3%]">
          <span className="absolute top-1/2 left-[1%] transform -translate-y-1/2 text-black flex gap-[28%] w-full">
            <span>{formData.postcode.slice(0, 1)}</span>
            <span>{formData.postcode.slice(1, 2)}</span>
            {formData.postcode.slice(2, 3)}
          </span>
          <input
            type="text"
            name="postcode"
            id="postcode"
            value={formData.postcode}
            maxLength={3}
            onChange={handleChange}
            className="absolute inset-0 opacity-0 cursor-text"
            placeholder="E-MAIL"
          />
        </div>

        {/* Address */}
        <div className="absolute top-[61.5%] left-[32%] w-[59%] h-[3%]">
          <span className="absolute top-1/2 left-4 transform -translate-y-1/2 text-black">
            {formData.address}
          </span>
          <input
            type="text"
            name="address"
            id="address"
            value={formData.address}
            onChange={handleChange}
            maxLength={35}
            className="absolute inset-0 opacity-0 cursor-text"
            placeholder="寄送地址"
          />
        </div>

        {/* Submit button */}
        <div
          className="absolute bottom-[7%] left-[7%] w-[86%] h-[9.5%] cursor-pointer"
          onClick={handleSubmit}
        >
          <div className="absolute inset-0 opacity-100">
            <button type="submit" className="w-full h-full" />
          </div>
        </div>
      </div>
      <div className="relative w-full h-full sm:block hidden text-[12px]">
        <div className="absolute top-[28%] left-[16%] w-[31%] h-[3%]">
          <span className="absolute top-1/2 left-3 transform -translate-y-1/2 text-black">
            {formData.name}
          </span>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            maxLength={10}
            className="absolute inset-0 opacity-0 cursor-text"
          />
        </div>
        {/* Gender selection */}
        <div className="absolute top-[28%] right-[9%] w-[29%] h-[3%] flex">
          <div className="w-1/2 relative">
            <span className="absolute top-1/2 left-1 transform -translate-y-1/2 text-black">
              {formData.gender === "男" ? "✓" : ""}
            </span>
            <input
              type="radio"
              name="gender"
              value="男"
              checked={formData.gender === "男"}
              onChange={handleChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
          <div className="w-1/2 relative">
            <span className="absolute top-1/2 left-1 transform -translate-y-1/2 text-black">
              {formData.gender === "女" ? "✓" : ""}
            </span>
            <input
              type="radio"
              name="gender"
              value="女"
              checked={formData.gender === "女"}
              onChange={handleChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
        </div>

        {/* Age groups */}
        <div className="absolute top-[32%] left-[16%] w-[80%] h-[3%] flex">
          <div className="w-1/4 relative">
            <span className="absolute top-1/2 left-[2px] transform -translate-y-1/2 text-black">
              {formData.age === "25以下" ? "✓" : ""}
            </span>
            <input
              type="radio"
              name="age"
              value="25以下"
              checked={formData.age === "25以下"}
              onChange={handleChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
          <div className="w-1/4 relative">
            <span className="absolute top-1/2 left-2 transform -translate-y-1/2 text-black">
              {formData.age === "26-30" ? "✓" : ""}
            </span>
            <input
              type="radio"
              name="age"
              value="26-30"
              checked={formData.age === "26-30"}
              onChange={handleChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
          <div className="w-1/4 relative">
            <span className="absolute top-1/2 left-[6px] transform -translate-y-1/2 text-black">
              {formData.age === "31-35" ? "✓" : ""}
            </span>
            <input
              type="radio"
              name="age"
              value="31-35"
              checked={formData.age === "31-35"}
              onChange={handleChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
          <div className="w-1/4 relative">
            <span className="absolute top-1/2 left-1 transform -translate-y-1/2 text-black">
              {formData.age === "36-40" ? "✓" : ""}
            </span>
            <input
              type="radio"
              name="age"
              value="36-40"
              checked={formData.age === "36-40"}
              onChange={handleChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
        </div>

        <div className="absolute top-[36%] left-[16%] w-[80%] h-[3%] flex">
          <div className="w-1/4 relative">
            <span className="absolute top-1/2 left-[2px] transform -translate-y-1/2 text-black">
              {formData.age === "41-45" ? "✓" : ""}
            </span>
            <input
              type="radio"
              name="age"
              value="41-45"
              checked={formData.age === "41-45"}
              onChange={handleChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
          <div className="w-1/4 relative">
            <span className="absolute top-1/2 left-[8px] transform -translate-y-1/2 text-black">
              {formData.age === "46-50" ? "✓" : ""}
            </span>
            <input
              type="radio"
              name="age"
              value="46-50"
              checked={formData.age === "46-50"}
              onChange={handleChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
          <div className="w-1/4 relative">
            <span className="absolute top-1/2  left-[6px] transform -translate-y-1/2 text-black">
              {formData.age === "51+" ? "✓" : ""}
            </span>
            <input
              type="radio"
              name="age"
              value="51+"
              checked={formData.age === "51+"}
              onChange={handleChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
        </div>

        {/* Phone number */}
        <div className="absolute top-[40%] left-[23%] w-[71%] h-[3%]">
          <span className="absolute top-1/2 left-4 transform -translate-y-1/2 text-black">
            {formData.phone}
          </span>
          <input
            type="tel"
            name="phone"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            maxLength={10}
            className="absolute inset-0 opacity-0 cursor-text"
            placeholder="手機號碼"
          />
        </div>

        {/* Product Type */}
        <div className="absolute top-[44%] left-[31%] w-[33%] h-[3%] flex">
          <div className="w-1/2 relative">
            <span className="absolute top-1/2 left-1 transform -translate-y-1/2 text-black">
              {formData.experience === "油屑" ? "✓" : ""}
            </span>
            <input
              type="radio"
              name="experience"
              value="油屑"
              checked={formData.experience === "油屑"}
              onChange={handleChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
          <div className="w-1/2 relative">
            <span className="absolute top-1/2 left-[8px] transform -translate-y-1/2 text-black">
              {formData.experience === "乾屑" ? "✓" : ""}
            </span>
            <input
              type="radio"
              name="experience"
              value="乾屑"
              checked={formData.experience === "乾屑"}
              onChange={handleChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
        </div>

        {/* Email */}
        <div className="absolute top-[52.6%] left-[19%] w-[75%] h-[3%]">
          <span className="absolute top-1/2 left-3 transform -translate-y-1/2 text-black">
            {formData.email}
          </span>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="absolute inset-0 opacity-0 cursor-text"
            placeholder="E-MAIL"
            maxLength={30}
          />
        </div>
        <div className="absolute top-[57%] left-[23.5%] w-[20%] h-[3%]">
          <span className="absolute top-1/2 left-[6px] transform -translate-y-1/2 text-black">
            <span className="mr-[17px]">{formData.postcode.slice(0, 1)}</span>
            <span className="mr-[17px]">{formData.postcode.slice(1, 2)}</span>
            {formData.postcode.slice(2, 3)}
          </span>
          <input
            type="text"
            name="postcode"
            id="postcode"
            value={formData.postcode}
            maxLength={3}
            onChange={handleChange}
            className="absolute inset-0 opacity-0 cursor-text"
            placeholder="E-MAIL"
          />
        </div>

        {/* Address */}
        <div className="absolute top-[61%] left-[5%] w-[89%] h-[3%]">
          <span className="absolute top-1/2 left-4 transform -translate-y-1/2 text-black">
            {formData.address}
          </span>
          <input
            type="text"
            name="address"
            id="address"
            value={formData.address}
            onChange={handleChange}
            maxLength={35}
            className="absolute inset-0 opacity-0 cursor-text"
            placeholder="寄送地址"
          />
        </div>

        {/* Submit button */}
        <div
          className="absolute bottom-[4%] left-[3%] w-[93%] h-[5.5%] cursor-pointer"
          onClick={handleSubmit}
        >
          <div className="absolute inset-0 opacity-100">
            <button type="submit" className="w-full h-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

const Popup = ({ config, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="relative w-[383px] h-[484px] overflow-hidden sm:block hidden">
        <img
          src={config.popup}
          alt="popup-background"
          className="absolute inset-0 object-cover "
        />
        <button
          onClick={() => {
            navigator.clipboard.writeText("juniper0318");
            alert("優惠碼已複製");
          }}
          className="absolute top-[77.7%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[70%] h-[8%] rounded-md"
        />
        <button
          onClick={() => {
            window.open(config.links.PRODUCT, "_blank");
          }}
          className="absolute bottom-0 left-[50%] transform -translate-x-1/2 w-[74%] h-[11%] rounded-full"
        />
        <button
          onClick={onClose}
          className="absolute top-[15px] right-[22px] p-4"
        />
      </div>
      <div className="relative w-full max-w-[795px] mx-auto sm:hidden block">
        <div className="relative w-full" style={{ paddingBottom: "55.47%" }}>
          <img
            src={config.desktop.popup}
            alt="popup-background"
            className="absolute inset-0 w-full h-full object-contain"
          />
          <button
            onClick={() => {
              navigator.clipboard.writeText("juniper0318");
              alert("優惠碼已複製");
            }}
            className="absolute top-[48%] left-[4.5%] w-[49%] h-[11%] rounded-md"
          />
          <button
            onClick={() => {
              window.open(config.links.PRODUCT, "_blank");
            }}
            className="absolute bottom-0 left-[50%] transform -translate-x-1/2 w-[57%] h-[19%] rounded-full"
          />
          <button
            onClick={onClose}
            className="absolute top-[4%] right-[5%] p-4"
          />
        </div>
      </div>
    </div>
  );
};

const ResultPage = memo(({ resultImage, config, onRestart }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(true);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        // 嘗試將圖片轉為Blob以便分享
        const blob = await fetch(resultImage).then((r) => r.blob());
        const file = new File([blob], "result.png", { type: "image/png" });

        await navigator.share({
          title: "「打工人」壓力測試！你的職場菜色是?",
          text: `測看看你的「職場壓力鍋菜色」是哪一道：https://event.ttshow.tw/scalp_dandruff#game`,
          url: window.location.href,
          files: [file],
        });
      }
    } catch (error) {
      console.error("Share Failed:", error);

      // 如果無法分享檔案，則嘗試只分享文字和URL
      if (navigator.share) {
        try {
          await navigator.share({
            title: "「打工人」壓力測試！你的職場菜色是?",
            text: `測看看你的「職場壓力鍋菜色」是哪一道：https://event.ttshow.tw/scalp_dandruff#game`,
            url: window.location.href,
          });
        } catch (shareError) {
          console.error("Text share failed:", shareError);
        }
      }
    }
  };

  const handleDownload = () => {
    try {
      if (!resultImage) {
        console.error("下載圖片失敗：圖片源不存在");
        return;
      }

      let downloadUrl = resultImage;
      let shouldRevokeUrl = false;

      if (resultImage instanceof Blob || resultImage instanceof File) {
        downloadUrl = URL.createObjectURL(resultImage);
        shouldRevokeUrl = true;
      }

      if (typeof resultImage === "string" && resultImage.startsWith("data:")) {
        if (!resultImage.includes("data:image/")) {
          console.error("下載圖片失敗：無效的圖片格式");
          return;
        }
      }

      // 創建下載元素
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = "result.png";
      document.body.appendChild(a);
      a.click();

      // 清理
      setTimeout(() => {
        document.body.removeChild(a);
        if (shouldRevokeUrl) {
          URL.revokeObjectURL(downloadUrl);
        }
      }, 100);
    } catch (error) {
      console.error("下載圖片時發生錯誤:", error);
    }
  };

  const handleRestartClick = () => {
    onRestart();
  };

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  useEffect(() => {
    if (isPopupOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isPopupOpen]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative">
      <img
        src={config.cardResult}
        alt="background"
        className="absolute inset-0 object-cover object-top w-full h-full sm:block hidden"
      />
      <img
        src={config.desktop.cardResult}
        alt="background"
        className="fixed inset-0 object-cover w-full h-[100vh] sm:hidden"
        style={{ zIndex: -1 }}
      />
      <div className="h-screen sm:h-auto overflow-y-auto sm:overflow-hidden ">
        <div className="flex flex-col items-center justify-start pt-8 pb-16 sm:w-full w-[80%] mx-auto">
          <div className="relative sm:px-[32px] px-0 w-full sm:max-w-[430px] max-w-[700px] py-8">
            <div className="outcome-container relative rounded-[15px] overflow-hidden">
              <img
                className="w-full sm:max-w-[350px] max-w-[700px] mx-auto object-contain"
                src={resultImage}
                alt="打工人測驗結果"
              />
            </div>
          </div>
          <div className="relative result-content flex flex-col justify-content items-center sm:max-w-[430px] max-w-[700px] w-full">
            <div className="relative  flex flex-col justify-center items-center align-center w-full sm:max-w-[350px] rounded-3xl mb-4 max-w-[700px]">
              <img
                src={config?.formBlock}
                alt="form-block"
                className="sm:block hidden"
              />
              <img
                src={config.desktop.formBlock}
                alt="form-block"
                className="sm:hidden block"
              />
              <FromBlock config={config} openPopup={handleOpenPopup} />
            </div>
            <div className="sm:block hidden">
              <div className="text-center">
                <button onClick={handleDownload}>
                  <img
                    className="share-button"
                    src={config?.result?.outcomeHint}
                    alt="outcome-hint"
                  />
                </button>
              </div>
              <div className="flex mb-4">
                <button onClick={handleRestartClick} className="w-[140px]">
                  <img
                    className="restart-button"
                    src={config?.buttons?.restartButton}
                    alt="restart-button-image"
                  />
                </button>
                <button onClick={handleShare}>
                  <img
                    className="share-button"
                    src={config.buttons.shareButton}
                    alt="share-to-friends"
                  />
                </button>
              </div>
            </div>
            <div className="sm:hidden block my-5">
              <div className="text-center mb-4">
                <button onClick={handleDownload}>
                  <img
                    className="share-button"
                    src={config.desktop.buttons.outcomeHint}
                    alt="outcome-hint"
                  />
                </button>
              </div>
              <div className="flex">
                <button onClick={handleRestartClick} className="w-[40%]">
                  <img
                    className="restart-button"
                    src={config.desktop.buttons.restartButton}
                    alt="restart-button-image"
                  />
                </button>
                <button onClick={handleShare} className="w-[60%]">
                  <img
                    className="share-button"
                    src={config.desktop.buttons.shareButton}
                    alt="share-to-friends"
                  />
                </button>
              </div>
            </div>
            <div
              className="relative  flex flex-col justify-center items-center align-center w-full max-w-[700px]
                      rounded-3xl mb-4 sm:hidden"
            >
              <img
                src={config.desktop.wash_share}
                alt="wash-and-share-exp"
                className="sm:hidden block"
              />
              <div className="absolute top-[40.3%] left-[15%] w-[69.5%] h-[3.7%] rounded-full">
                <button
                  id="clickToParticipatedesktop"
                  className="w-full h-full"
                  onClick={() => {
                    window.open(config.links.PARTICIPATE, "_blank");
                  }}
                />
              </div>
              <div className="absolute top-[73.3%] left-[30%] w-[40%] h-[3.9%] rounded-full">
                <button
                  id="clickToProduct1desktop"
                  className="w-full h-full"
                  onClick={() => {
                    window.open(config.links.PRODUCT, "_blank");
                  }}
                />
              </div>
              <div className="absolute top-[96.3%] left-[30%] w-[40%] h-[3.9%] rounded-full">
                <button
                  id="clickToProduct2desktop"
                  className="w-full h-full"
                  onClick={() => {
                    window.open(config.links.PRODUCT, "_blank");
                  }}
                />
              </div>
            </div>

            <div
              className="relative  flex-col justify-center items-center align-center w-full sm:max-w-[350px] sm:flex hidden
                      rounded-3xl mb-4 font-semibold text-sm"
            >
              <img
                src={config.wash_share}
                alt="wash-and-share-exp"
                className="sm:block hidden"
              />

              <a
                id="clickToParticipate"
                className="absolute bottom-[24%] w-[90%] hidden sm:block"
                target="_blank"
                href={config.links.PARTICIPATE}
              >
                <img
                  src={config.clickToParticipateBtn}
                  alt="click-to-participate"
                  className="w-full h-auto"
                />
              </a>
            </div>

            <div
              className="relative flex-col justify-center items-center align-center w-full max-w-[350px]
                      rounded-3xl mb-4 font-semibold text-sm  hidden sm:flex"
            >
              <img src={config?.propaganda_01} alt="propaganda-light" />
              <button
                id="clickToProduct1"
                className="absolute -bottom-[4%] w-[60%] left-[20%]"
              >
                <a target="_blank" href={config.links.PRODUCT}>
                  <img
                    src={config?.buttons?.detailsButton}
                    alt="see-more-details"
                  />
                </a>
              </button>
            </div>

            <div
              className="relative  flex-col justify-center items-center align-center w-full max-w-[350px]
                      rounded-3xl mb-10 pt-3 pb-4 font-semibold text-sm  hidden sm:flex"
            >
              <img src={config?.propaganda_02} alt="propaganda-water" />
              <button
                id="clickToProduct2"
                className="absolute bottom-0 w-[60%] left-[20%]"
                onClick={handleRestartClick}
              >
                <a target="_blank" href={config.links.PRODUCT}>
                  <img
                    src={config?.buttons?.detailsButton}
                    alt="see-more-details"
                  />
                </a>
              </button>
            </div>
            {isPopupOpen && (
              <Popup config={config} onClose={handleClosePopup} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

const TestControls = ({ setIsLoading, setUploadError }) => {
  return (
    <div className="fixed top-4 right-4 z-50 bg-white p-4 rounded-lg shadow-lg border-2 border-gray-200">
      <h3 className="font-bold mb-2 text-sm">測試控制面板</h3>
      <div className="flex flex-col gap-2">
        <button
          onClick={() => setIsLoading((prev) => !prev)}
          className="px-3 py-1 bg-blue-500 rounded hover:bg-blue-600 text-sm"
        >
          切換 Loading 狀態
        </button>
        <button
          onClick={() => setUploadError((prev) => !prev)}
          className="px-3 py-1 bg-red-500 rounded hover:bg-red-600 text-sm"
        >
          切換上傳失敗狀態
        </button>
      </div>
    </div>
  );
};

const LoadingPage = memo(({ config }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);

  // 處理進度條動畫
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 4; // 每次增加4%，大約25步驟完成
      });
    }, 120); // 每120毫秒更新一次，總計約3秒完成

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="flex min-h-[100dvh] w-full items-center justify-center sm:hidden ">
        <img
          src={config.desktop.cardLoading}
          alt="background"
          className="absolute inset-0 object-cover w-full h-full"
        />
        <div className="relative w-full transition-all duration-300">
          <DesktopFrame imgType="loading" config={config} />
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
              w-full flex flex-col items-center justify-center"
          >
            <div className="mb-8 relative w-[60%] max-w-[800px] h-auto overflow-hidden">
              <img src={config.loadingVisual} alt="loading-visual-eggs" />
            </div>

            <div className="relative w-[60%] max-w-[800px] h-[40px] border-[3px] border-[#402529] rounded-full bg-[#04493C] overflow-hidden mb-4">
              <div
                className="relative h-full bg-[#E2F2EE] transition-all duration-300 ease-out"
                style={{ width: `${loadingProgress}%` }}
              ></div>
              <img
                className="absolute left-[10px] top-1/2 h-[14px] transform -translate-y-1/2"
                src={config.loadingCaption}
                alt="loading-caption"
              />
            </div>

            <p className="text-[#402529] font-bold">{loadingProgress}%</p>
          </div>
        </div>
      </div>
      <div className="w-full min-h-[100dvh] items-center justify-center max-w-[430px] sm:flex hidden">
        <img
          src={config.cardLoading}
          alt="background"
          className="absolute inset-0 object-cover w-full h-full"
        />
        <div className="relative w-full transition-all duration-300">
          <CardFrame imgType="loading" config={config} />
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
              w-full flex flex-col items-center justify-center"
          >
            <div className="mb-8 relative w-full max-w-[320px] h-[120px] overflow-hidden">
              <img src={config.loadingVisual} alt="loading-visual-eggs" />
            </div>

            <div className="relative w-full max-w-[320px] h-[24px] border-[3px] border-[#402529] rounded-full bg-[#04493C] overflow-hidden mb-4">
              <div
                className="relative h-full bg-[#E2F2EE] transition-all duration-300 ease-out"
                style={{ width: `${loadingProgress}%` }}
              ></div>
              <img
                className="absolute left-[10px] top-1/2 h-[14px] transform -translate-y-1/2"
                src={config.loadingCaption}
                alt="loading-caption"
              />
            </div>

            <p className="text-[#402529] font-bold">{loadingProgress}%</p>
          </div>
        </div>
      </div>
    </div>
  );
});

ReactDOM.render(<App />, document.querySelector("#root"));
