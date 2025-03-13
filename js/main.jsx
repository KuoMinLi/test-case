import React, {
  memo,
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "https://esm.sh/react@18.2.0";
import ReactDOM from "https://esm.sh/react-dom@18.2.0";
import STORAGE_DATA from "./js/constant.js";
import STORAGE_DATA_GAME from "./js/constantGame.js";

const headerHightDesktop = 83.81;
const headerHight = 57.22;

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

const Header = ({ config }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const MenuButton = ({ src, alt, tag, className }) => (
    <div className="relative w-full">
      <a
        className="flex items-center justify-between"
        href={`#${tag}`}
        onClick={toggleMenu}
      >
        <img src={src} alt={alt} className={className} />
        <img
          src={config.mobile.header.rightArrow}
          alt="arrow"
          className="w-3 h-3"
        />
      </a>
    </div>
  );

  const toggleItems = () => {
    const itemPairs = document.querySelectorAll(".toggle-pair");

    itemPairs.forEach((pair) => {
      const whiteItem = pair.querySelector(".white-item");
      const greenItem = pair.querySelector(".green-item");

      if (whiteItem && greenItem) {
        whiteItem.classList.toggle("hidden");
        greenItem.classList.toggle("hidden");
      }
    });
  };

  // 設置定時器每隔 500 毫秒切換一次，5秒後清除定時器
  useEffect(() => {
    const timer = setInterval(toggleItems, 500);
    setTimeout(() => {
      clearInterval(timer);
    }, 5000);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <header className="w-full bg-[#69B4A7] shadow-[0_8px_20px_0_rgba(65,71,66,0.6)] lg:hidden block">
        <div className="flex items-center justify-between px-4 py-2">
          <a href="#header">
            <img
              src={config.desktop.header.logo}
              alt="logo"
              className="w-[240px] h-auto"
            />
          </a>
          <div className="flex items-center justify-end gap-5">
            <div className="flex items-center">
              <a href="game">
                <div className="toggle-pair">
                  <img
                    src={config.desktop.header.gameWhite}
                    alt="white logo"
                    className="item white-item w-[200px]"
                  />
                  <img
                    src={config.desktop.header.gameGreen}
                    alt="green logo"
                    className="item green-item hidden w-[200px]"
                  />
                </div>
              </a>
              <a href="#free">
                <img
                  src={config.desktop.header.free}
                  alt="free"
                  className="w-[120px] h-auto"
                />
              </a>
              <a href="#prize">
                <img
                  src={config.desktop.header.prize}
                  alt="prize"
                  className="w-[112px] h-auto"
                />
              </a>
            </div>
            <a href="#video">
              <img
                src={config.desktop.header.video}
                alt="video"
                className="w-[60px] h-auto pt-[10px]"
              />
            </a>
            <a href="#recommend">
              <img
                src={config.desktop.header.recommend}
                alt="recommend}"
                className="w-[60px] h-auto pt-[10px]"
              />
            </a>
            <a href="#level">
              <img
                src={config.desktop.header.level}
                alt="level}"
                className="w-[70px] h-auto pt-[10px]"
              />
            </a>
            <a href="#real">
              <img
                src={config.desktop.header.real}
                alt="real"
                className="w-[60px] h-auto pt-[10px]"
              />
            </a>
            <div className="flex items-center -space-x-3">
              <a onClick={() => window.open(config.links.official)}>
                <img
                  src={config.desktop.header.icon}
                  alt="logo"
                  className="w-[50px] h-auto pt-[10px]"
                />
              </a>
              <a onClick={() => window.open(config.links.fb)}>
                <img
                  src={config.desktop.header.fb}
                  alt="logo"
                  className="w-[50px] h-auto pt-[10px]"
                />
              </a>
            </div>
          </div>
        </div>
      </header>
      <header className="w-full bg-[#69B4A7] shadow-[0_8px_20px_0_rgba(65,71,66,0.6)] lg:block hidden">
        <div className="flex items-center justify-between px-4 py-2">
          <a href="#header">
            <img
              src={config.mobile.header.logo}
              alt="logo"
              className="w-[150px] h-auto"
            />
          </a>
          <button onClick={toggleMenu} className="">
            <img
              src={config.mobile.header.openbtn}
              alt="menu"
              className="w-6 h-6"
            />
          </button>
        </div>
      </header>

      {/* Sliding Menu Overlay */}
      <div
        className={`fixed top-0 right-0 h-full w-[280px] bg-white transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } shadow-lg z-50`}
      >
        {/* Close Button */}
        <div className="absolute top-4 right-4">
          <button onClick={toggleMenu} className="">
            <img
              src={config.mobile.header.closebtn}
              alt="close"
              className="w-6 h-6"
            />
          </button>
        </div>

        {/* Menu Items */}
        <div className="mt-12 px-4 flex flex-col gap-[30px]">
          <div className="toggle-pair">
            <div className="relative w-full item white-item">
              <a
                className="flex items-center justify-between"
                href="#game"
                onClick={toggleMenu}
              >
                <img
                  src={config.mobile.header.gameWhite}
                  alt="gameWhite"
                  className="w-[200px]"
                />
                <img
                  src={config.mobile.header.rightArrow}
                  alt="arrow"
                  className="w-3 h-3"
                />
              </a>
            </div>
            <div className="relative w-full item green-item hidden">
              <a
                className="flex items-center justify-between"
                href="#game"
                onClick={toggleMenu}
              >
                <img
                  src={config.mobile.header.gameGreen}
                  alt="gameGreen"
                  className="w-[200px]"
                />
                <img
                  src={config.mobile.header.rightArrow}
                  alt="arrow"
                  className="w-3 h-3"
                />
              </a>
            </div>
          </div>
          <MenuButton
            src={config.mobile.header.free}
            alt="free"
            tag="free"
            className="w-[130px]"
          />
          <MenuButton
            src={config.mobile.header.prize}
            alt="prize"
            tag="prize"
            className="w-[130px]"
          />
          <MenuButton
            src={config.mobile.header.video}
            alt="video"
            tag="video"
            className="w-[100px]"
          />
          <MenuButton
            src={config.mobile.header.recommend}
            alt="recommend"
            tag="recommend"
            className="w-[100px]"
          />
          <MenuButton
            src={config.mobile.header.level}
            alt="level"
            tag="level"
            className="w-[100px]"
          />
          <MenuButton
            src={config.mobile.header.real}
            alt="real"
            tag="real"
            className="w-[100px]"
          />

          {/* Social Icons */}
          <div className="flex items-center space-x-4">
            <a onClick={() => window.open(config.links.official)}>
              <img
                src={config.mobile.header.icon}
                alt="icon"
                className="w-[45px]"
              />
            </a>
            <a onClick={() => window.open(config.links.fb)}>
              <img
                src={config.mobile.header.fb}
                alt="fb"
                className="w-[45px]"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const Banner = ({ config }) => {
  return (
    <div className="relative w-full">
      <img
        src={config.desktop.banner}
        alt="background"
        className="w-full object-cover card:hidden block object-cover object-top h-[100vh]"
      />
      <button
        className="fixed z-50 bottom-10 right-5 card:hidden block"
        onClick={() => window.open(config.links.line)}
      >
        <img
          src={config.desktop.ctaImage}
          alt="ctaImage"
          className="w-[150px] h-auto"
        />
      </button>
      <img
        src={config.mobile.banner}
        alt="background"
        className="w-full h-[calc(100vh+30px)] object-cover object-top card:block hidden mt-[calc(20px-4vw)]"
      />
      <button
        className="fixed z-50 bottom-5 right-2 card:block hidden"
        onClick={() => window.open(config.links.line)}
      >
        <img
          src={config.mobile.ctaImage}
          alt="ctaImage"
          className="w-[100px] h-auto"
        />
      </button>
    </div>
  );
};

const GameSection = ({ config, onCardClick = false }) => {
  return (
    <div className="relative w-full z-10">
      <div
        className={`lg:-mt-[${headerHight}px] -mt-[${headerHightDesktop}px] absolute top-0`}
        id="gameSection"
      />
      <img
        src={config.desktop.gameSection.background}
        alt="background"
        className="w-full object-cover lg:hidden block"
      />
      <div className="absolute top-0 left-0 w-full h-full lg:hidden block">
        <div className="flex flex-col items-center gap-5 mt-[40px]">
          <img
            src={config.desktop.gameSection.title}
            alt="title"
            className="w-[65%] h-auto"
          />
          <img
            src={config.desktop.gameSection.text}
            alt="text"
            className="w-[65%] h-auto"
          />
          <div className="relative">
            <button onClick={onCardClick}>
              <img
                src={config.desktop.gameSection.card}
                alt="card"
                className="card:w-[65%] w-[80%] h-auto mx-auto max-w-[1400px]"
              />
            </button>
          </div>
        </div>
      </div>
      <img
        src={config.mobile.gameSection.background}
        alt="background"
        className="w-full object-cover lg:block hidden"
      />
      <div className="absolute top-0 left-0 w-full lg:block hidden">
        <div className="flex flex-col items-center w-full h-full gap-5 mt-[10px]">
          <img
            src={config.mobile.gameSection.title}
            alt="title"
            className="sm:w-full w-[90%] h-auto"
          />
          <div className="relative w-full">
            <button onClick={onCardClick}>
              <img
                src={config.mobile.gameSection.card}
                alt="card"
                className="relative w-[80%] h-auto mx-auto"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const PrizeSection = ({ config }) => {
  return (
    <div className="relative w-full -mt-[2.1%] z-1">
      <div
        className={`lg:-mt-[${headerHight}px] -mt-[${headerHightDesktop}px] absolute top-0`}
        id="prize"
      />
      <img
        src={config.desktop.prizeSection.background}
        alt="background"
        className="w-full object-cover lg:hidden block"
      />
      <div className="absolute top-0 left-0 w-full h-full lg:hidden block">
        <div className="flex flex-col items-center mt-[60px]">
          <img
            src={config.desktop.prizeSection.title}
            alt="title"
            className="w-[65%] h-auto"
          />
          <img
            src={config.desktop.prizeSection.text}
            alt="text"
            className="w-[65%] h-auto -mt-[40px]"
          />
          <div className="relative w-full -mt-[20px]">
            <img
              src={config.desktop.prizeSection.card}
              alt="card"
              className="w-[65%] h-auto mx-auto"
            />
            <button onClick={() => window.open(config.links.PARTICIPATE)}>
              <img
                src={config.desktop.prizeSection.cta}
                alt="cta"
                className="absolute bottom-[29%] right-[26%] w-[28%] h-auto"
              />
            </button>
          </div>
        </div>
      </div>
      <img
        src={config.mobile.prizeSection.background}
        alt="background"
        className="w-full object-cover lg:block hidden"
      />
      <a id="prize-cta" onClick={() => window.open(config.links.prize)}>
        <img
          src={config.mobile.prizeSection.cta}
          alt="cta"
          className="absolute bottom-[20%] inset-x-0 w-[64%] h-auto mx-auto lg:block hidden"
        />
      </a>
    </div>
  );
};

const CustomInput = ({
  label = "領取地址",
  placeholder = "郵遞區號 (3碼)",
  onChange,
  value,
  className = "",
  name = "",
  maxLength = 50,
}) => {
  const handleChange = (e) => {
    if (onChange) {
      onChange(e);
    }
  };
  return (
    <div className={`relative w-full ${className}`}>
      <div className="p-2 lg:p-0 bg-white">
        <div className="flex items-center">
          <div className="text-teal text-lg mr-2 lg:hidden block">{label}</div>
          <div className="flex-1">
            <input
              type="text"
              name={name}
              id={name}
              value={value}
              onChange={handleChange}
              placeholder={placeholder}
              maxLength={maxLength}
              className="w-full lg:pl-2 p-1 rounded-md bg-white lg:h-[30px] focus:outline-none placeholder-gray lg:placeholder:text-xs lg:text-xs text-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const CustomSelector = ({
  title,
  options,
  onChange,
  name = "",
  className = "",
  placeholder = "",
  value = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(() => {
    if (value) {
      const option = options.find((opt) => opt.value === value);
      return option || { value: "", label: "" };
    }
    return { value: "", label: "" };
  });
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (value) {
      const option = options.find((opt) => opt.value === value);
      if (option) {
        setSelectedOption(option);
      }
    } else {
      // 當 value 為空時，重置 selectedOption
      setSelectedOption({ value: "", label: "" });
    }
  }, [value, options]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);

    if (onChange) {
      const syntheticEvent = {
        target: {
          name: name,
          value: option.value,
        },
      };
      onChange(syntheticEvent);
    }
  };

  return (
    <div className={`relative w-full bg-white ${className}`} ref={dropdownRef}>
      <div
        className="flex justify-between items-center text-lg lg:h-[30px] h-[48px] text-teal p-2 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div>
          <span className="mr-3 lg:hidden inline">{title}</span>
          {selectedOption.value === "" ? (
            <span className="text-gray lg:text-xs">{placeholder}</span>
          ) : (
            <span className="lg:text-xs">{selectedOption.value}</span>
          )}
        </div>
        <span className="arrow-down"></span>
      </div>

      <div className="relative w-full lg:-mt-[25px] lg:ml-0 -mt-[50px] -ml-[25px]">
        <div
          className={`absolute top-full left-0 w-full rounded-lg shadow-md z-10 overflow-hidden px-2 py-1 bg-[#EEF4EF] ${
            isOpen ? "block" : "hidden"
          }`}
        >
          {options.map((option) => (
            <div
              key={option.value}
              className={`py-2 px-3 border-b my-1 rounded-md border-gray cursor-pointer hover:bg-[#C6DFFE] hover:text-white 
                ${
                  selectedOption.value === option.value
                    ? "bg-[#4395FD] text-white "
                    : "bg-white"
                }`}
              onClick={() => handleOptionSelect(option)}
            >
              {selectedOption.value === option.value ? (
                <span className="flex justify-between items-center">
                  <span>
                    <span className="font-bold ml-1">✓</span> {option.label}
                  </span>
                </span>
              ) : (
                <span className="ml-5 font-bold">{option.label}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <select
        className="absolute opacity-0 pointer-events-none"
        name={name}
        value={selectedOption.value}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

const AgeSelector = ({ onChange, className = "", value }) => {
  const ageOptions = [
    { value: "25以下", label: "25以下" },
    { value: "26-30", label: "26-30" },
    { value: "31-35", label: "31-35" },
    { value: "36-40", label: "36-40" },
    { value: "41-45", label: "41-45" },
    { value: "46-50", label: "46-50" },
    { value: "51以上", label: "51以上" },
  ];

  return (
    <CustomSelector
      title="年齡"
      options={ageOptions}
      onChange={onChange}
      name="age"
      className={className}
      value={value}
      placeholder="年齡"
    />
  );
};

const GenderSelector = ({ onChange, className = "", value }) => {
  const genderOptions = [
    { value: "男", label: "男" },
    { value: "女", label: "女" },
  ];

  return (
    <CustomSelector
      title="性別"
      options={genderOptions}
      onChange={onChange}
      name="gender"
      value={value}
      className={className}
      placeholder="性別"
    />
  );
};

const ProductTypeSelector = ({
  placeholder,
  onChange,
  className = "",
  value,
}) => {
  const productOptions = [
    { value: "油性頭皮屑", label: "油性頭皮屑" },
    { value: "乾性頭皮屑", label: "乾性頭皮屑" },
  ];

  return (
    <CustomSelector
      title="申請產品"
      options={productOptions}
      onChange={onChange}
      name="experience"
      value={value}
      className={className}
      placeholder={placeholder}
    />
  );
};

const FreeSection = memo(({ config, handleShowNote }) => {
  const [formData, setFormData] = useState({
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

    // Consent validation
    if (!formData.consent) {
      newErrors.consent = "請同意注意事項";
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

    // Remove consent from form data before sending
    const { consent, ...rest } = formData;
    const res = await handlePostData(rest, false);
    if (res.status === 200) {
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

  const handleConsentChange = (e) => {
    if (e.target.checked) {
      handleShowNote();
    }
    setFormData({
      ...formData,
      consent: e.target.checked,
    });
  };

  return (
    <div className="relative w-full z-2">
      <div
        className={`lg:-mt-[${headerHight}px] -mt-[${headerHightDesktop}px] absolute top-0`}
        id="free"
      />
      <div className="w-full lg:hidden block">
        <div className="relative w-full">
          <img
            src={config.desktop.freeSection.background}
            alt="background"
            className="absolute top-0 left-0 w-full object-cover bg-repeat-space"
          />
          <div className="w-[66%] ml-auto" style={{ height: "62.5vw" }}>
            <div className="z-10 relative flex flex-col items-center justify-start">
              <img
                src={config.desktop.freeSection.title}
                alt="title"
                className="w-[90%] mt-[30px]"
              />
              <img
                src={config.desktop.freeSection.text}
                alt="text"
                className="w-[90%]"
              />
              <img
                src={config.desktop.freeSection.subText}
                alt="subText"
                className="w-[90%]"
              />
              <div className="mx-auto rounded-lg p-6 relative w-full max-w-[800px]">
                <img
                  className="absolute top-0 left-0 w-full object-cover bg-repeat-y"
                  src={config.desktop.freeSection.tableBackground}
                  alt="tableBackground"
                />
                <form
                  onSubmit={handleSubmit}
                  className="mx-2 mt-[50px] max-w-[680px] mx-auto"
                >
                  <div className="grid grid-cols-2 gap-y-2 gap-x-4 pt-2 mb-2">
                    <CustomInput
                      label="姓名："
                      placeholder="姓名"
                      onChange={handleChange}
                      value={formData.name}
                      name="name"
                      maxLength={20}
                    />
                    <GenderSelector
                      onChange={handleChange}
                      value={formData.gender}
                    />
                    <CustomInput
                      label="電話："
                      placeholder="09xxxxxxxx"
                      onChange={handleChange}
                      value={formData.phone}
                      name="phone"
                      maxLength={10}
                    />
                    <AgeSelector onChange={handleChange} value={formData.age} />
                    <CustomInput
                      label="EMAIL："
                      placeholder="EMAIL"
                      onChange={handleChange}
                      value={formData.email}
                      name="email"
                      maxLength={30}
                    />
                    <ProductTypeSelector
                      onChange={handleChange}
                      value={formData.experience}
                      placeholder="油屑/乾屑"
                    />
                  </div>
                  <div className="flex w-full gap-4 mb-1">
                    <div className="w-1/3">
                      <CustomInput
                        label="郵遞區號(3碼)："
                        placeholder=""
                        onChange={handleChange}
                        value={formData.postcode}
                        name="postcode"
                        maxLength={3}
                      />
                    </div>
                    <div className="w-2/3">
                      <CustomInput
                        label="寄送地址："
                        placeholder="使用宅配配送，請勿使用郵政信箱收件"
                        onChange={handleChange}
                        value={formData.address}
                        name="address"
                      />
                    </div>
                  </div>

                  {/* Notes section */}
                  <div className="rounded text-sm relative text-[#094A42] mb-[2px]">
                    <div className="flex items-baseline mb-1">
                      <div className="mr-2 mt-1 relative">
                        <input
                          type="checkbox"
                          id="consent"
                          name="consent"
                          checked={formData.consent}
                          onChange={handleConsentChange}
                          className="appearance-none w-4 h-4 rounded-full cursor-pointer bg-white"
                        />
                        {formData.consent && (
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-3 h-3 rounded-full bg-teal"></div>
                          </div>
                        )}
                      </div>
                      <label htmlFor="consent" className="cursor-pointer">
                        <span className="underline text-base">
                          提醒您送出資料後，即代表您同意將此資料提供予艾瑪絲做為試用品寄送及行銷活動使用。
                        </span>
                      </label>
                    </div>
                    <div className="mt-1 ml-5">
                      <p>
                        *油屑:外觀可見偏黃油油的、大片塊狀，黏在髮根或頭皮上面
                      </p>
                      <p>*乾屑:頭皮易有癢感,髮絲間附許多白色、細小的皮屑</p>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex justify-center gap-4 relative">
                    <button
                      type="button"
                      onClick={() => window.open(config.links.ctaProduct)}
                    >
                      <img
                        src={config.desktop.freeSection.ctaProduct}
                        alt="ctaProduct"
                        className="w-[240px]"
                      />
                    </button>
                    <button type="submit">
                      <img
                        src={config.desktop.freeSection.ctaFree}
                        alt="ctaFree"
                        className="w-[280px]"
                      />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full hidden lg:block -mt-[3%]">
        <img
          src={config.mobile.freeSection.product}
          alt="product"
          className="w-full object-cover"
        />
        <div className="relative w-full">
          <img
            src={config.mobile.freeSection.background}
            alt="background"
            className="relative w-full object-cover object-top bg-repeat-space sm:h-[700px] h-auto"
          />
          <div className="absolute top-0 left-0 mx-auto rounded-lg p-6  w-full max-w-[800px]">
            <img
              className="absolute top-[18vw] inset-x-0 sm:h-[480px] h-auto w-full object-cover bg-repeat-y  mx-auto sm:max-w-[370px] max-w-[420px]"
              src={config.mobile.freeSection.tableBackground}
              alt="tableBackground"
            />
            <form
              onSubmit={handleSubmit}
              className="mx-2  max-w-[320px] mx-auto"
              style={{ marginTop: "calc(18vw + 20px)" }}
            >
              <div className="flex flex-col flex-wrap gap-y-2 pt-2 sm:px-1 px-4">
                <div className="flex items-center">
                  <div className="relative w-[100px] text-teal text-bold mr-2  h-[28px]">
                    真實姓名
                  </div>
                  <CustomInput
                    label="姓名："
                    placeholder="姓名"
                    onChange={handleChange}
                    value={formData.name}
                    name="name"
                    maxLength={20}
                  />
                </div>
                <div className="flex items-center">
                  <div className="relative w-[100px] text-teal text-bold mr-2 h-[28px]">
                    性別
                  </div>
                  <GenderSelector
                    onChange={handleChange}
                    className="h-[30px]"
                    value={formData.gender}
                  />
                </div>
                <div className="flex items-center">
                  <div className="relative w-[100px] text-teal text-bold mr-2  h-[28px]">
                    年齡
                  </div>
                  <AgeSelector
                    onChange={handleChange}
                    className="h-[30px]"
                    value={formData.age}
                  />
                </div>
                <div className="flex items-center">
                  <div className="relative w-[100px] text-teal text-bold mr-2  h-[28px]">
                    EMAIL
                  </div>
                  <CustomInput
                    label="EMAIL："
                    placeholder="EMAIL"
                    onChange={handleChange}
                    value={formData.email}
                    name="email"
                    maxLength={30}
                  />
                </div>
                <div className="flex items-center">
                  <div className="relative w-[100px] text-teal text-bold mr-2  h-[28px]">
                    電話
                  </div>
                  <CustomInput
                    label="電話："
                    placeholder="09xxxxxxxx"
                    onChange={handleChange}
                    value={formData.phone}
                    name="phone"
                    maxLength={10}
                  />
                </div>
                <div className="flex items-center">
                  <div className="relative w-[100px] text-teal text-bold mr-2 h-[28px]">
                    申請產品
                  </div>
                  <ProductTypeSelector
                    onChange={handleChange}
                    placeholder="油屑/乾屑"
                    className="h-[30px]"
                    value={formData.experience}
                  />
                </div>

                <div className="flex items-center">
                  <div className="relative w-[100px] text-teal text-bold mr-2 h-[28px]">
                    領取地址
                  </div>
                  <CustomInput
                    label="郵遞區號(3碼)："
                    placeholder="郵遞區號(3碼)"
                    onChange={handleChange}
                    value={formData.postcode}
                    name="postcode"
                    maxLength={3}
                  />
                </div>
                <div className="flex items-center">
                  <div className="relative w-[100px] text-teal text-bold mr-2 h-[28px]" />
                  <CustomInput
                    label="寄送地址："
                    placeholder="使用宅配配送，請勿使用郵政信箱收件"
                    onChange={handleChange}
                    value={formData.address}
                    name="address"
                  />
                </div>
              </div>

              {/* Notes section */}
              <div className="mt-2 rounded text-xs relative text-[#094A42]">
                <div className="flex items-baseline mb-2">
                  <div className="mr-2 mt-1 relative">
                    <input
                      type="checkbox"
                      id="consent"
                      name="consent"
                      checked={formData.consent}
                      onChange={handleConsentChange}
                      className="appearance-none w-3 h-3 rounded-full cursor-pointer bg-white"
                    />
                    {formData.consent && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-2 h-2 rounded-full bg-teal"></div>
                      </div>
                    )}
                  </div>
                  <label htmlFor="consent" className="cursor-pointer">
                    <span className="underline text-sm">
                      提醒您送出資料後，即代表您同意將此資料提供予艾瑪絲做為試用品寄送及行銷活動使用。
                    </span>
                  </label>
                </div>
                <div className="mt-1 ml-5">
                  <p>*油屑:外觀可見偏黃油油的、大片塊狀，黏在髮根或頭皮上面</p>
                  <p>*乾屑:頭皮易有癢感,髮絲間附許多白色、細小的皮屑</p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col justify-center items-center gap-2 mt-[40px] relative">
                <button type="submit">
                  <img
                    src={config.mobile.freeSection.ctaFree}
                    alt="ctaFree"
                    className="w-[280px]"
                  />
                </button>
                <button
                  type="button"
                  onClick={() => window.open(config.links.ctaProduct)}
                >
                  <img
                    src={config.mobile.freeSection.ctaProduct}
                    alt="ctaProduct"
                    className="w-[280px]"
                  />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
});

const SwiperContent = ({
  config,
  data,
  initialNumber = 3,
  id = "default",
  className = "",
}) => {
  const [slidesPerView, setSlidesPerView] = useState(initialNumber); // 預設顯示 3 個
  const swiperRef = useRef(null);
  const swiperInstanceRef = useRef(null);

  const nextButtonClass = `carousel-next-${id}`;
  const prevButtonClass = `carousel-prev-${id}`;

  const handleResize = () => {
    const width = window.innerWidth;
    if (width < 800) {
      setSlidesPerView(1);
    } else {
      setSlidesPerView(initialNumber);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (swiperRef.current) {
      if (swiperInstanceRef.current) {
        swiperInstanceRef.current.destroy(true, true);
      }

      swiperInstanceRef.current = new Swiper(swiperRef.current, {
        slidesPerView: slidesPerView,
        spaceBetween: 20,
        centeredSlides: false,
        loop: true,
        navigation: {
          nextEl: `.${nextButtonClass}`,
          prevEl: `.${prevButtonClass}`,
        },
      });
    }

    // 組件卸載時清理
    return () => {
      if (swiperInstanceRef.current) {
        swiperInstanceRef.current.destroy(true, true);
      }
    };
  }, [slidesPerView, nextButtonClass, prevButtonClass]);

  // 生成輪播項目
  const items = data.map((item) => (
    <div className="swiper-slide" key={item.id}>
      <div className="card">
        <div className="relative mx-1">
          <img src={config.desktop.videoSection.columnCard} alt="column-card" />
          <img
            src={config.desktop.videoSection.card2title}
            alt="card2-title"
            className="absolute -bottom-4 left-0 px-6"
          />
        </div>
        <p className="text-[30px] text-center my-3">xxxxxxxxxxxxxxx</p>
      </div>
    </div>
  ));

  return (
    <div className={`carousel-container ${className}`}>
      <div className="carousel">
        <div className="swiper" ref={swiperRef}>
          <div className="swiper-wrapper">{items}</div>
        </div>
        <button className={`carousel-button ${prevButtonClass}`}>
          <img
            className="start-button button-width"
            src={config.desktop.videoSection.leftArrow}
            alt="left-arrow"
          />
        </button>
        <button className={`carousel-button ${nextButtonClass}`}>
          <img
            className="start-button button-width"
            src={config.desktop.videoSection.rightArrow}
            alt="right-arrow"
          />
        </button>
      </div>
    </div>
  );
};

const VideoSection = memo(({ config }) => {
  const carouselData = [
    { id: 1, title: "GIRSTALK", number: 4 },
    { id: 2, title: "肌肉山山", number: 5 },
    { id: 3, title: "紫冠廷", number: 6 },
  ];

  return (
    <div className="relative w-full">
      <div className={`mt-[${headerHight}px]`} id="video" />
      <div className="relative w-full">
        <img
          className="w-full h-[1900px] object-cover bg-repeat-y object-top lg:hidden block"
          src={config.desktop.videoSection.background}
          alt="background"
        />
        <img
          className="w-full videoSection object-cover object-top bg-repeat-y lg:block hidden"
          src={config.mobile.videoSection.background}
          alt="background"
        />
        <div className="z-10 absolute w-full h-full top-0 left-0 flex flex-col items-center ">
          <img
            src={config.desktop.videoSection.title}
            alt="title"
            className="w-1/2 mx-auto mb-1 mt-[60px] lg:hidden block"
          />
          <img
            src={config.desktop.videoSection.text}
            alt="text"
            className="w-1/2 mx-auto lg:hidden block"
          />
          <div className="relative card:w-[80%] w-1/2 max-w-[878px] mx-1 lg:mt-[27vw] mt-0">
            <img
              src={config.desktop.videoSection.rowCard}
              alt="row-card"
              className="w-full"
            />
            <img
              src={config.desktop.videoSection.card1title}
              alt="card1-title"
              className="absolute -bottom-4 left-1/4 w-1/2 "
            />
          </div>
          <p className="text-[30px] my-3">xxxxxxxxxxxxxxx</p>
          <div className="flex justify-center items-center gap-[60px] max-w-[878px] card:hidden block">
            <div>
              <div className="relative mx-1">
                <img
                  src={config.desktop.videoSection.columnCard}
                  alt="column-card"
                  className="max-w-[258px]"
                />
                <img
                  src={config.desktop.videoSection.card2title}
                  alt="card2-title"
                  className="absolute -bottom-4 left-0 px-6"
                />
              </div>
              <p className="text-[30px] text-center my-3">xxxxxxxxxxxxxxx</p>
            </div>
            <div>
              <div className="relative mx-1">
                <img
                  src={config.desktop.videoSection.columnCard}
                  alt="column-card"
                  className="max-w-[258px]"
                />
                <img
                  src={config.desktop.videoSection.card3title}
                  alt="card3-title"
                  className="absolute -bottom-4 left-0 px-6"
                />
              </div>
              <p className="text-[30px] text-center my-3">xxxxxxxxxxxxxxx</p>
            </div>
          </div>
          <div className="card:block hidden">
            <SwiperContent
              config={config}
              data={carouselData}
              initialNumber={1}
              id="master"
            />
          </div>
          <div className="max-h-[432px]">
            <SwiperContent config={config} data={carouselData} id="star" />
          </div>
        </div>
      </div>
    </div>
  );
});

const RecommendSection = memo(({ config }) => {
  return (
    <div className="relative w-full" id="recommend">
      <div className="relative w-full lg:hidden block">
        <img
          src={config.desktop.recommendSection.background}
          alt="background"
          className="absolute relative w-full object-cover bg-repeat-y"
        />
        <div className="z-10 absolute top-0 left-0 w-full flex flex-col items-center justify-center">
          <img
            src={config.desktop.recommendSection.title}
            alt="title"
            className="w-1/2 mt-[60px]"
          />
          <img
            src={config.desktop.recommendSection.text}
            alt="text"
            className="w-1/2"
          />
          <div className="flex justify-center items-center gap-[60px]">
            <div className="max-w-[320px] mx-auto">
              <img
                src={config.desktop.recommendSection.rowCard}
                alt="row-card"
              />
              <img
                src={config.desktop.recommendSection.card1title}
                alt="card1-title"
              />
              <p className="text-[30px] text-center my-1">xxxxxxxxxxxxxxx</p>
            </div>
            <div className="max-w-[320px] mx-auto">
              <img
                src={config.desktop.recommendSection.rowCard}
                alt="row-card"
              />
              <img
                src={config.desktop.recommendSection.card2title}
                alt="card2-title"
              />
              <p className="text-[30px] text-center my-1">xxxxxxxxxxxxxxx</p>
            </div>
          </div>
          <div className="flex justify-center items-center gap-[60px]">
            <div className="max-w-[320px] mx-auto">
              <img
                src={config.desktop.recommendSection.rowCard}
                alt="row-card"
              />
              <img
                src={config.desktop.recommendSection.card3title}
                alt="card3-title"
              />
              <p className="text-[30px] text-center my-1">xxxxxxxxxxxxxxx</p>
            </div>
            <div className="max-w-[320px] mx-auto">
              <img
                src={config.desktop.recommendSection.rowCard}
                alt="row-card"
              />
              <img
                src={config.desktop.recommendSection.card4title}
                alt="card4-title"
              />
              <p className="text-[30px] text-center my-1">xxxxxxxxxxxxxxx</p>
            </div>
            <div className="max-w-[320px] mx-auto">
              <img
                src={config.desktop.recommendSection.rowCard}
                alt="row-card"
              />
              <img
                src={config.desktop.recommendSection.card5title}
                alt="card5-title"
              />
              <p className="text-[30px] text-center my-1">xxxxxxxxxxxxxxx</p>
            </div>
          </div>
        </div>
      </div>
      <div className="relative w-full lg:block hidden">
        <img
          src={config.mobile.recommendSection.background}
          alt="background"
          className="relative recommendSection w-full object-cover object-top bg-repeat-y"
        />
        <div className="absolute top-0 left-0 flex flex-col items-center justify-center w-full mt-[30vw]">
          <div className="flex flex-col mt-[50px] items-center gap-[30px] w-[70%]">
            <div className="max-w-[320px] mx-auto">
              <img
                src={config.desktop.recommendSection.rowCard}
                alt="row-card"
              />
              <img
                src={config.mobile.recommendSection.card1title}
                alt="card1-title"
              />
              <p className="text-[30px] text-center my-1">xxxxxxxxxxxxxxx</p>
            </div>
            <div className="max-w-[320px] mx-auto">
              <img
                src={config.desktop.recommendSection.rowCard}
                alt="row-card"
              />
              <img
                src={config.mobile.recommendSection.card2title}
                alt="card2-title"
              />
              <p className="text-[30px] text-center my-1">xxxxxxxxxxxxxxx</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

const LevelSection = memo(({ config }) => {
  return (
    <div className="relative w-full">
      <div
        className={`lg:-mt-[${headerHight}px] -mt-[${headerHightDesktop}px] absolute top-0`}
        id="level"
      />
      <div className="relative w-full">
        <img
          src={config.desktop.levelSection.background}
          alt="background"
          className="w-full object-cover bg-repeat-y lg:hidden block"
        />
        <img
          src={config.mobile.levelSection.background}
          alt="background"
          className="w-full object-cover bg-repeat-y lg:block hidden"
        />
        <div className="z-10 absolute top-0 left-0 w-full flex flex-col items-center justify-center lg:hidden block">
          <div className="max-w-[1000px] mx-auto px-6">
            <img
              src={config.desktop.levelSection.title}
              alt="title"
              className=" mt-[60px]"
            />
            <img
              src={config.desktop.levelSection.text}
              alt="text"
              className="w-[60%] mx-auto -mt-[20px]"
            />
            <img
              src={config.desktop.levelSection.subText}
              alt="subText"
              className="w-[80%] mx-auto mt-[20px]"
            />
            <img
              src={config.desktop.levelSection.image}
              alt="image"
              className="w-[90%] mx-auto mt-[20px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
});

const RealSection = memo(({ config }) => {
  return (
    <div className="relative w-full">
      <div className="relative w-full">
        <div
          className={`lg:-mt-[${headerHight}px] -mt-[calc(${headerHightDesktop}px + 7.5vw)] absolute top-0`}
          id="real"
        />
        <img
          src={config.desktop.realSection.background}
          alt="background"
          className="w-full object-cover bg-repeat-y md:hidden block -mt-[7.5vw]"
        />
        <img
          src={config.mobile.realSection.background}
          alt="background"
          className="w-full object-cover bg-repeat-y md:block hidden"
        />
      </div>
    </div>
  );
});

const Footer = ({ config }) => {
  return (
    <div className="relative w-full">
      <div className="relative w-full card:hidden block">
        <img
          src={config.desktop.footer.background}
          alt="background"
          className="w-full object-cover bg-repeat-y"
        />
        <button
          className="absolute w-[31%] h-[48%] "
          style={{ top: "4%", left: "34.4%" }}
          onClick={() => {
            window.open(config.links.fb);
          }}
        />
        <div className="absolute top-[53%] w-full">
          <div className="flex items-center justify-center">
            <a onClick={() => window.open(config.links.official)}>
              <img
                src={config.desktop.footer.icon}
                alt="icon"
                className="w-[50px]"
              />
            </a>
            <a
              onClick={() =>
                window.open(config.links.line, "_blank", "noopener,noreferrer")
              }
            >
              <img
                src={config.desktop.footer.line}
                alt="icon"
                className="w-[50px]"
              />
            </a>
            <a onClick={() => window.open(config.links.ig)}>
              <img
                src={config.desktop.footer.ig}
                alt="icon"
                className="w-[50px]"
              />
            </a>
            <a onClick={() => window.open(config.links.yt)}>
              <img
                src={config.desktop.footer.yt}
                alt="icon"
                className="w-[50px]"
              />
            </a>
            <a onClick={() => window.open(config.links.fb)}>
              <img
                src={config.desktop.footer.fb}
                alt="icon"
                className="w-[50px]"
              />
            </a>
            <a onClick={() => window.open(config.links.messager)}>
              <img
                src={config.desktop.footer.messager}
                alt="icon"
                className="w-[50px]"
              />
            </a>
          </div>
        </div>
      </div>
      <div className="relative w-full card:block hidden">
        <img
          src={config.mobile.footer.background}
          alt="background"
          className="w-full object-cover bg-repeat-y"
        />
        <button
          className="absolute w-[73%] h-[35%]"
          style={{ top: "4%", left: "13%" }}
          onClick={() => {
            window.open(config.links.fb);
          }}
        />
        <div className="absolute top-[45%] w-full">
          <div className="flex items-center justify-center gap-[10%]">
            <a onClick={() => window.open(config.links.official)}>
              <img
                src={config.mobile.footer.icon}
                alt="icon"
                className="w-[40px]"
              />
            </a>
            <a onClick={() => window.open(config.links.line)}>
              <img
                src={config.mobile.footer.line}
                alt="icon"
                className="w-[40px]"
              />
            </a>
            <a onClick={() => window.open(config.links.ig)}>
              <img
                src={config.mobile.footer.ig}
                alt="icon"
                className="w-[40px]"
              />
            </a>
          </div>
          <div className="flex items-center justify-center gap-[10%] mt-[1%]">
            <a onClick={() => window.open(config.links.yt)}>
              <img
                src={config.mobile.footer.yt}
                alt="icon"
                className="w-[40px]"
              />
            </a>
            <a onClick={() => window.open(config.links.fb)}>
              <img
                src={config.mobile.footer.fb}
                alt="icon"
                className="w-[40px]"
              />
            </a>
            <a onClick={() => window.open(config.links.messager)}>
              <img
                src={config.mobile.footer.messager}
                alt="icon"
                className="w-[40px]"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const PsychologicalGame = ({ onClose }) => {
  const [staticJson, setStaticJson] = useState(STORAGE_DATA_GAME);
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
        return `${staticJson.config.result.result0}`; // 甚麼都有的辦桌流水席
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
      text: question.text,
      options: question.options.map((option, index) => ({
        letter: option.letter,
        text: option.text,
      })),
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
      <div className="flex flex-col w-full">
        <StartPage
          config={staticJson?.config}
          onStart={handleStart}
          currentQuestionIndex={currentQuestionIndex}
        />
      </div>
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
            className="absolute top-[2%] right-[5%] text-black text-3xl"
          >
            X
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
    question: config.desktop.cardQuestion,
    loading: config.desktop.cardLoading,
  };

  return (
    <div className="relative w-full">
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
        <div className="relative w-full transition-all duration-300 flex flex-col items-center justify-center">
          <div className="mx-auto max-w-[800px]">
            <DesktopFrame
              imgType="start"
              config={config}
              currentQuestionIndex={currentQuestionIndex}
            />
          </div>
          <button className="mt-6 w-[35%] mx-auto" onClick={onStart}>
            <img className="start-button-float" src={config.desktop.buttons.startButton} alt="start-button-image" />
          </button>
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
            className="absolute bottom-[8%] left-[20%] w-[60%] h-[7%] rounded-full"
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
    const { text, options } = currentQuestion;
    console.log("currentQuestion", currentQuestion);
    console.log("buttons", buttons);

    return (
      <div>
        <div className="flex w-full min-h-[100dvh] md:pt-[calc(-57.5vw+445px)] pt-[100px] justify-center sm:hidden">
          <img
            src={config.desktop.background}
            alt="background"
            className="absolute inset-0 object-cover w-full h-full"
          />
          <div className="relative w-full transition-all duration-300">
            <div className="relative w-full transition-all duration-300">
              <div className=" max-w-[600px] mx-auto">
                <DesktopFrame
                  imgType={"question_" + questionId}
                  config={config}
                />
              </div>
              <div className="flex flex-col items-center w-full gap-3">
                {buttons?.map((button, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      handleButtonClick(button?.score, button?.letter)
                    }
                    onTouchEnd={(e) => e.target.blur()}
                    className="w-full rounded-full h-full bg-white border-4 border-[#534B49] py-2 button-float"
                  >
                    <span
                      className="font-[900]"
                      style={{ fontFamily: "sans-serif" }}
                    >
                      {
                        options.filter(
                          (option) => option.letter === button.letter
                        )[0]?.text
                      }
                    </span>
                  </button>
                ))}
              </div>

              <button
                onClick={handleBackClick}
                className="z-10 flex items-center justify-center gap-3 mt-3 font-bold  w-full back-button-slide"
                style={{ fontFamily: "sans-serif" }}
              >
                <span className="arrow-left"></span>
                <span>回到上一題</span>
              </button>
            </div>
          </div>
        </div>
        <div className="w-full min-h-[100dvh] items-center justify-center max-w-[430px] sm:flex hidden">
          <img
            src={config.background}
            alt="background"
            className="absolute inset-0 object-cover w-full h-full"
          />
          <div className="relative w-full transition-all duration-300">
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
        <div className="absolute top-[33.9%] left-[15.5%] w-[35%] h-[3%]">
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            maxLength={10}
            className="ml-3 absolute inset-0 opacity-100 cursor-text border-none focus:outline-none"
            style={{ background: "transparent" }}
          />
        </div>
        {/* Gender selection */}
        <div className="absolute top-[33.9%] right-[17.7%] w-[20%] h-[3%] flex">
          <div className="w-1/2 relative">
            <span className="absolute top-1/2 left-0 transform -translate-y-1/2 text-black">
              {formData.gender === "男" ? (
                <svg width="20" height="20" viewBox="0 0 20 20">
                  <circle cx="10" cy="10" r="8" fill="black" />
                </svg>
              ) : (
                ""
              )}
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
            <span className="absolute top-1/2 left-[3%] transform -translate-y-1/2 text-black">
              {formData.gender === "女" ? (
                <svg width="20" height="20" viewBox="0 0 20 20">
                  <circle cx="10" cy="10" r="8" fill="black" />
                </svg>
              ) : (
                ""
              )}
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
        <div className="absolute top-[38.3%] left-[15.5%] w-[65%] h-[3%] flex">
          <div className="w-1/4 relative">
            <span className="absolute top-1/2 left-[1%] transform -translate-y-1/2 text-black">
              {formData.age === "25以下" ? (
                <svg width="20" height="20" viewBox="0 0 20 20">
                  <circle cx="10" cy="10" r="8" fill="black" />
                </svg>
              ) : (
                ""
              )}
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
            <span className="absolute top-1/2 left-[4%] transform -translate-y-1/2 text-black">
              {formData.age === "26-30" ? (
                <svg width="20" height="20" viewBox="0 0 20 20">
                  <circle cx="10" cy="10" r="8" fill="black" />
                </svg>
              ) : (
                ""
              )}
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
            <span className="absolute top-1/2 left-[1%] transform -translate-y-1/2 text-black">
              {formData.age === "31-35" ? (
                <svg width="20" height="20" viewBox="0 0 20 20">
                  <circle cx="10" cy="10" r="8" fill="black" />
                </svg>
              ) : (
                ""
              )}
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
            <span className="absolute top-1/2 left-[5%] transform -translate-y-1/2 text-black">
              {formData.age === "36-40" ? (
                <svg width="20" height="20" viewBox="0 0 20 20">
                  <circle cx="10" cy="10" r="8" fill="black" />
                </svg>
              ) : (
                ""
              )}
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
            <span className="absolute top-1/2 left-[1%] transform -translate-y-1/2 text-black">
              {formData.age === "41-45" ? (
                <svg width="20" height="20" viewBox="0 0 20 20">
                  <circle cx="10" cy="10" r="8" fill="black" />
                </svg>
              ) : (
                ""
              )}
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
            <span className="absolute top-1/2 left-[5%] transform -translate-y-1/2 text-black">
              {formData.age === "46-50" ? (
                <svg width="20" height="20" viewBox="0 0 20 20">
                  <circle cx="10" cy="10" r="8" fill="black" />
                </svg>
              ) : (
                ""
              )}
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
            <span className="absolute top-1/2 left-[1%] transform -translate-y-1/2 text-black">
              {formData.age === "51+" ? (
                <svg width="20" height="20" viewBox="0 0 20 20">
                  <circle cx="10" cy="10" r="8" fill="black" />
                </svg>
              ) : (
                ""
              )}
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
        <div className="absolute top-[47.2%] left-[20.5%] w-[23%] h-[3%]">
          <input
            type="tel"
            name="phone"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            maxLength={10}
            className="ml-3 absolute inset-0 opacity-100 cursor-text border-none focus:outline-none"
            style={{ background: "transparent" }}
          />
        </div>

        {/* Product Type */}
        <div className="absolute top-[47.2%] left-[66%] w-[26%] h-[3%] flex">
          <div className="w-1/2 relative">
            <span className="absolute top-1/2 left-[5%] transform -translate-y-1/2 text-black">
              {formData.experience === "油性頭皮屑" ? (
                <svg width="20" height="20" viewBox="0 0 20 20">
                  <circle cx="10" cy="10" r="8" fill="black" />
                </svg>
              ) : (
                ""
              )}
            </span>
            <input
              type="radio"
              name="experience"
              value="油性頭皮屑"
              checked={formData.experience === "油性頭皮屑"}
              onChange={handleChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
          <div className="w-1/2 relative">
            <span className="absolute top-1/2 left-[8%] transform -translate-y-1/2 text-black">
              {formData.experience === "乾性頭皮屑" ? (
                <svg width="20" height="20" viewBox="0 0 20 20">
                  <circle cx="10" cy="10" r="8" fill="black" />
                </svg>
              ) : (
                ""
              )}
            </span>
            <input
              type="radio"
              name="experience"
              value="乾性頭皮屑"
              checked={formData.experience === "乾性頭皮屑"}
              onChange={handleChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
        </div>

        {/* Email */}
        <div className="absolute top-[57.5%] left-[18.8%] w-[73%] h-[3%]">
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="ml-3 absolute inset-0 opacity-100 cursor-text border-none focus:outline-none"
            style={{ background: "transparent" }}
            maxLength={30}
          />
        </div>
        <div className="absolute top-[61.7%] left-[20.2%] w-[11%] h-[3%]">
          <span className="absolute top-1/2 left-[8%] transform -translate-y-1/2 text-black">
            {formData.postcode.slice(0, 1)}
          </span>
          <span className="absolute top-1/2 left-[43%] transform -translate-y-1/2 text-black">
            {formData.postcode.slice(1, 2)}
          </span>
          <span className="absolute top-1/2 left-[77%] transform -translate-y-1/2 text-black">
            {formData.postcode.slice(2, 3)}
          </span>
          <input
            type="text"
            name="postcode"
            id="postcode"
            value={formData.postcode}
            maxLength={3}
            onChange={handleChange}
            className="ml-3 absolute inset-0 opacity-0 cursor-text"
            placeholder="E-MAIL"
          />
        </div>

        {/* Address */}
        <div className="absolute top-[61.5%] left-[32%] w-[59.5%] h-[3.2%]">
          <input
            type="text"
            name="address"
            id="address"
            value={formData.address}
            onChange={handleChange}
            maxLength={35}
            className="ml-3 absolute inset-0 opacity-100 cursor-text border-none focus:outline-none"
            style={{ background: "transparent" }}
          />
        </div>

        {/* Submit button */}
        <div
          className="absolute bottom-[5.5%] left-[7%] w-[86.1%] h-[9.3%] cursor-pointer"
          onClick={handleSubmit}
        >
          <div className="absolute inset-0 opacity-100">
            <button type="submit" className="w-full h-full" />
          </div>
        </div>
      </div>
      <div className="relative w-full h-full sm:block hidden text-[12px]">
        <div className="absolute top-[28%] left-[16%] w-[31%] h-[3%]">
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            maxLength={10}
            className="ml-3 w-full absolute inset-0 opacity-100 cursor-text border-none focus:outline-none"
            style={{ background: "transparent" }}
          />
        </div>
        {/* Gender selection */}
        <div className="absolute top-[28.2%] right-[10%] w-[29%] h-[3%] flex">
          <div className="w-1/2 relative">
            <span className="absolute top-1/2 left-[5%] transform -translate-y-1/2 text-black">
              {formData.gender === "男" ? (
                <svg width="16" height="16" viewBox="0 0 20 20">
                  <circle cx="10" cy="10" r="8" fill="black" />
                </svg>
              ) : (
                ""
              )}
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
            <span className="absolute top-1/2 left-[6%] transform -translate-y-1/2 text-black">
              {formData.gender === "女" ? (
                <svg width="16" height="16" viewBox="0 0 20 20">
                  <circle cx="10" cy="10" r="8" fill="black" />
                </svg>
              ) : (
                ""
              )}
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
        <div className="absolute top-[32.2%] left-[16%] w-[80%] h-[3%] flex">
          <div className="w-1/4 relative">
            <span className="absolute top-1/2 left-[2%] transform -translate-y-1/2 text-black">
              {formData.age === "25以下" ? (
                <svg width="16" height="16" viewBox="0 0 20 20">
                  <circle cx="10" cy="10" r="8" fill="black" />
                </svg>
              ) : (
                ""
              )}
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
            <span className="absolute top-1/2 left-[9%] transform -translate-y-1/2 text-black">
              {formData.age === "26-30" ? (
                <svg width="16" height="16" viewBox="0 0 20 20">
                  <circle cx="10" cy="10" r="8" fill="black" />
                </svg>
              ) : (
                ""
              )}
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
            <span className="absolute top-1/2 left-[4%] transform -translate-y-1/2 text-black">
              {formData.age === "31-35" ? (
                <svg width="16" height="16" viewBox="0 0 20 20">
                  <circle cx="10" cy="10" r="8" fill="black" />
                </svg>
              ) : (
                ""
              )}
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
            <span className="absolute top-1/2 left-[3%] transform -translate-y-1/2 text-black">
              {formData.age === "36-40" ? (
                <svg width="16" height="16" viewBox="0 0 20 20">
                  <circle cx="10" cy="10" r="8" fill="black" />
                </svg>
              ) : (
                ""
              )}
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

        <div className="absolute top-[36.1%] left-[16%] w-[80%] h-[3%] flex">
          <div className="w-1/4 relative">
            <span className="absolute top-1/2 left-[2%] transform -translate-y-1/2 text-black">
              {formData.age === "41-45" ? (
                <svg width="16" height="16" viewBox="0 0 20 20">
                  <circle cx="10" cy="10" r="8" fill="black" />
                </svg>
              ) : (
                ""
              )}
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
            <span className="absolute top-1/2 left-[9%] transform -translate-y-1/2 text-black">
              {formData.age === "46-50" ? (
                <svg width="16" height="16" viewBox="0 0 20 20">
                  <circle cx="10" cy="10" r="8" fill="black" />
                </svg>
              ) : (
                ""
              )}
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
            <span className="absolute top-1/2 left-[4%] transform -translate-y-1/2 text-black">
              {formData.age === "51+" ? (
                <svg width="16" height="16" viewBox="0 0 20 20">
                  <circle cx="10" cy="10" r="8" fill="black" />
                </svg>
              ) : (
                ""
              )}
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
        <div className="absolute top-[40%] left-[24%] w-[70%] h-[3%]">
          <input
            type="tel"
            name="phone"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            maxLength={10}
            className="ml-3 absolute inset-0 opacity-100 cursor-text border-none focus:outline-none"
            style={{ background: "transparent" }}
          />
        </div>

        {/* Product Type */}
        <div className="absolute top-[44%] left-[31%] w-[33%] h-[3%] flex">
          <div className="w-1/2 relative">
            <span className="absolute top-1/2 left-[4%] transform -translate-y-1/2 text-black">
              {formData.experience === "油性頭皮屑" ? (
                <svg width="16" height="16" viewBox="0 0 20 20">
                  <circle cx="10" cy="10" r="8" fill="black" />
                </svg>
              ) : (
                ""
              )}
            </span>
            <input
              type="radio"
              name="experience"
              value="油性頭皮屑"
              checked={formData.experience === "油性頭皮屑"}
              onChange={handleChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
          <div className="w-1/2 relative">
            <span className="absolute top-1/2 left-[8%] transform -translate-y-1/2 text-black">
              {formData.experience === "乾性頭皮屑" ? (
                <svg width="16" height="16" viewBox="0 0 20 20">
                  <circle cx="10" cy="10" r="8" fill="black" />
                </svg>
              ) : (
                ""
              )}
            </span>
            <input
              type="radio"
              name="experience"
              value="乾性頭皮屑"
              checked={formData.experience === "乾性頭皮屑"}
              onChange={handleChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
        </div>

        {/* Email */}
        <div className="absolute top-[52.6%] left-[20%] w-[74%] h-[3%]">
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="ml-3 absolute inset-0 opacity-100 cursor-text border-none focus:outline-none"
            style={{ background: "transparent" }}
            maxLength={30}
          />
        </div>
        <div className="absolute top-[57%] left-[23.5%] w-[20%] h-[3%]">
          <span className="absolute top-1/2 left-[10%] transform -translate-y-1/2 text-black">
            {formData.postcode.slice(0, 1)}
          </span>
          <span className="absolute top-1/2 left-[43%] transform -translate-y-1/2 text-black">
            {formData.postcode.slice(1, 2)}
          </span>
          <span className="absolute top-1/2 left-[73%] transform -translate-y-1/2 text-black">
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
        <div className="absolute top-[60.95%] left-[6%] w-[88%] h-[3.08%]">
          <input
            type="text"
            name="address"
            id="address"
            value={formData.address}
            onChange={handleChange}
            maxLength={35}
            className="ml-3 absolute inset-0 opacity-100 cursor-text border-none focus:outline-none"
            style={{ background: "transparent" }}
          />
        </div>

        {/* Submit button */}
        <div
          className="absolute bottom-[3.9%] left-[3%] w-[93%] h-[5.5%] cursor-pointer"
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
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(
      "https://event.ttshow.tw/scalp_dandruff#game"
    );
    alert("連結已複製");
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
      a.download = "請上菜，你的職場菜色是？.png";
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
          <div className="relative sm:px-[16px] px-0 w-full sm:max-w-[430px] max-w-[700px] py-8">
            <div className="outcome-container relative rounded-[15px] overflow-hidden">
              <img
                className="w-full sm:max-w-[370px] max-w-[700px] mx-auto object-contain"
                src={resultImage}
                alt="打工人測驗結果"
              />
            </div>
          </div>
          <div className="relative result-content flex flex-col justify-content items-center sm:max-w-[430px] max-w-[700px] w-full">
            <div className="relative  flex flex-col justify-center items-center align-center w-full sm:max-w-[370px] rounded-3xl mb-4 max-w-[700px]">
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
              <div className="text-center max-w-[370px]">
                <button onClick={handleDownload}>
                  <img
                    className="share-button"
                    src={config?.result?.outcomeHint}
                    alt="outcome-hint"
                  />
                </button>
              </div>
              <div className="flex mb-4 justify-between max-w-[370px]">
                <button onClick={handleRestartClick} className="w-[38%]">
                  <img
                    className="restart-button"
                    src={config?.buttons?.restartButton}
                    alt="restart-button-image"
                  />
                </button>
                <button onClick={handleShare} className="w-[63%]">
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
                <button onClick={handleRestartClick} className="w-[41%]">
                  <img
                    className="restart-button"
                    src={config.desktop.buttons.restartButton}
                    alt="restart-button-image"
                  />
                </button>
                <button onClick={handleShare} className="w-[59%]">
                  <img
                    className="share-button"
                    src={config.desktop.buttons.shareButton}
                    alt="share-to-friends"
                  />
                </button>
              </div>
            </div>
            <div className="relative flex flex-col justify-center items-center align-center w-full max-w-[700px] mb-4 sm:hidden">
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

            <div className="relative hidden flex-col justify-center items-center align-center w-full max-w-[370px] mb-4 sm:flex">
              <img
                src={config.wash_share}
                alt="wash-and-share-exp"
                className="sm:block hidden"
              />
              <div className="absolute top-[30.1%] left-[4%] w-[91.5%] h-[2.3%] rounded-full">
                <button
                  id="clickToParticipatemobile"
                  className="w-full h-full"
                  onClick={() => {
                    window.open(config.links.PARTICIPATE, "_blank");
                  }}
                />
              </div>
              <div className="absolute top-[68.8%] left-[24.5%] w-[50%] h-[2.2%] rounded-full">
                <button
                  id="clickToProduct1mobile"
                  className="w-full h-full"
                  onClick={() => {
                    window.open(config.links.PRODUCT, "_blank");
                  }}
                />
              </div>
              <div className="absolute top-[97.7%] left-[24.5%] w-[50%] h-[2.2%] rounded-full">
                <button
                  id="clickToProduct2mobile"
                  className="w-full h-full"
                  onClick={() => {
                    window.open(config.links.PRODUCT, "_blank");
                  }}
                />
              </div>
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

const App = () => {
  const [staticJson, setStaticJson] = useState(STORAGE_DATA);
  const [showGame, setShowGame] = useState(false);
  const [isShowNote, setIsShowNote] = useState(false);

  const handleShowNote = () => {
    setIsShowNote(true);
  };

  const handleHideNote = () => {
    setIsShowNote(false);
  };

  useEffect(() => {
    if (isShowNote) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isShowNote]);

  const handleCardClick = () => {
    setShowGame(true); // 設置狀態為 true 以顯示 PsychologicaGame
    // 更新 URL，但不重新加載頁面
    window.history.pushState(null, "", "#game");
  };

  const handleGameClose = () => {
    setShowGame(false);
    window.history.pushState(null, "", window.location.pathname);
  };

  useEffect(() => {
    if (window.location.hash === "#game") {
      setShowGame(true);
    }

    // 監聽 popstate 事件（當用戶按下瀏覽器的前進/後退按鈕時觸發）
    const handlePopState = () => {
      setShowGame(window.location.hash === "#game");
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    const handleHashScroll = () => {
      if (window.location.hash) {
        const hashValue = window.location.hash;
        const id = hashValue.replace(/^#\/?/, "");

        const scrollAttempt = (attemptCount = 0) => {
          const element = document.getElementById(id);

          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            console.log(`Successfully scrolled to #${id}`);
          } else if (attemptCount < 5) {
            console.log(
              `Element #${id} not found, retrying... (${attemptCount + 1}/5)`
            );
            setTimeout(
              () => scrollAttempt(attemptCount + 1),
              300 * (attemptCount + 1)
            );
          } else {
            console.warn(
              `Failed to find element #${id} after multiple attempts`
            );
          }
        };

        scrollAttempt();
      }
    };

    window.addEventListener("load", handleHashScroll);
    window.addEventListener("hashchange", handleHashScroll);

    const timeoutId = setTimeout(handleHashScroll, 1000);

    return () => {
      window.removeEventListener("load", handleHashScroll);
      window.removeEventListener("hashchange", handleHashScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <>
      {!showGame ? (
        <>
          <Header config={staticJson.config} />
          <Banner config={staticJson.config} />
          <GameSection
            config={staticJson.config}
            onCardClick={handleCardClick}
          />
          <FreeSection
            config={staticJson.config}
            handleShowNote={handleShowNote}
          />
          <PrizeSection config={staticJson.config} />
          {/* <VideoSection config={staticJson.config} />
          <RecommendSection config={staticJson.config} /> */}
          <LevelSection config={staticJson.config} />
          <RealSection config={staticJson.config} />
          <Footer config={staticJson.config} />
          {isShowNote && (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 z-50">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full">
                <div className="relative sm:hidden block w-[70%] max-w-[700px] mx-auto">
                  <img
                    src={staticJson.config.desktop.freeSection.ctaNote}
                    alt="活動注意事項"
                    className="w-full h-auto"
                  />
                  <div className="absolute bottom-[10%] left-1/2 transform -translate-x-1/2 w-full flex justify-center">
                    <button
                      onClick={handleHideNote}
                      className="w-[30%] max-w-[180px]"
                    >
                      <img
                        src={staticJson.config.desktop.freeSection.confirm}
                        alt="確認同意"
                        className="w-full"
                      />
                    </button>
                  </div>
                </div>
                <div className="relative sm:block hidden">
                  <img
                    src={staticJson.config.mobile.freeSection.ctaNote}
                    alt="活動注意事項"
                    className="max-w-full min-w-[300px] w-[90%] mx-auto"
                  />
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                    <button onClick={handleHideNote}>
                      <img
                        src={staticJson.config.desktop.freeSection.confirm}
                        alt="確認同意"
                        className="w-[200px]"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div
          id="game"
          className="relative min-h-screen w-full overflow-y-auto bg-cover bg-no-repeat bg-center bg-fixed flex justify-center"
          style={{
            backgroundImage: `url(${staticJson.config.desktop.gameBackground})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed", // 這是實現視差效果的關鍵
            backgroundPosition: "center",
          }}
        >
          <div>
            <PsychologicalGame onClose={handleGameClose} />
          </div>
        </div>
      )}
    </>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
