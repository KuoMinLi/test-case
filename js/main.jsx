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

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <header className="w-full bg-[#69B4A7] lg:hidden block">
        <div className="flex items-center justify-between px-4 py-2">
          <a href="#header">
            <img
              src={config.desktop.header.logo}
              alt="logo"
              className="w-[240px] h-auto"
            />
          </a>
          <div className="flex items-center justify-end gap-3">
            <div className="flex items-center">
              <a href="#game">
                <img
                  src={config.desktop.header.gameWhite}
                  alt="logo"
                  className="w-[200px] h-auto"
                />
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
      </header>
      <header className="w-full bg-[#69B4A7] lg:block hidden">
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
          <MenuButton
            src={config.mobile.header.gameWhite}
            alt="gameWhite"
            tag="game"
            className="w-[200px]"
          />
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
        className="w-full object-cover card:hidden block object-cover object-top h-[100dvh]"
      />
      <button
        className="fixed z-50 bottom-10 right-5 card:hidden block"
        onClick={() => window.open(config.links.line)}
      >
        <img
          src={config.desktop.ctaImage}
          alt="ctaImage"
          className="w-[100px] h-auto"
        />
      </button>
      <img
        src={config.mobile.banner}
        alt="background"
        className="w-full h-[calc(100dvh+30px)] object-cover object-top card:block hidden mt-[calc(2vw-30px)]"
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

const GameSection = ({ config }) => {
  return (
    <div className="relative w-full z-10" id="game">
      <img
        src={config.desktop.gameSection.background}
        alt="background"
        className="w-full object-cover md:hidden block"
      />
      <div className="absolute top-0 left-0 w-full h-full md:hidden block">
        <div className="flex flex-col items-center gap-5 mt-[40px]">
          <img
            src={config.desktop.gameSection.title}
            alt="title"
            className="w-[80%] h-auto"
          />
          <img
            src={config.desktop.gameSection.text}
            alt="text"
            className="w-[80%] h-auto"
          />
          <img
            src={config.desktop.gameSection.card}
            alt="card"
            className="lg:w-[70%] w-[80%] h-auto max-w-[1200px]"
          />
        </div>
      </div>
      <img
        src={config.mobile.gameSection.background}
        alt="background"
        className="w-full object-cover md:block hidden"
      />
      <div className="absolute top-0 left-0 w-full h-full md:block hidden">
        <div className="flex flex-col items-center gap-5 mt-[10px]">
          <img
            src={config.mobile.gameSection.title}
            alt="title"
            className="w-[80%] h-auto"
          />
          <img
            src={config.mobile.gameSection.card}
            alt="card"
            className="w-[80%] h-auto"
          />
        </div>
      </div>
    </div>
  );
};

const PrizeSection = ({ config }) => {
  return (
    <div className="relative w-full -mt-[10px] z-10" id="prize">
      <img
        src={config.desktop.prizeSection.background}
        alt="background"
        className="w-full object-cover md:hidden block"
      />
      <div className="absolute top-0 left-0 w-full h-full md:hidden block">
        <div className="flex flex-col items-center mt-[40px]">
          <img
            src={config.desktop.prizeSection.title}
            alt="title"
            className="w-[70%] h-auto"
          />
          <img
            src={config.desktop.prizeSection.text}
            alt="text"
            className="w-[70%] h-auto -mt-[40px]"
          />
          <div className="relative w-full -mt-[20px]">
            <img
              src={config.desktop.prizeSection.card}
              alt="card"
              className="w-[70%] h-auto mx-auto"
            />
            <img
              src={config.desktop.prizeSection.cta}
              alt="cta"
              className="absolute bottom-[25%] right-[20%] w-[40%] h-auto"
            />
          </div>
        </div>
      </div>
      <img
        src={config.mobile.prizeSection.background}
        alt="background"
        className="w-full object-cover md:block hidden"
      />
      <a id="prize-cta" onClick={() => window.open(config.links.prize)}>
        <img
          src={config.mobile.prizeSection.cta}
          alt="cta"
          className="absolute bottom-[calc(40px+15vw)] inset-x-0 w-[280px] h-auto mx-auto md:block hidden"
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
              className="w-full lg:pl-2 p-1 rounded-md bg-white lg:h-[30px] focus:outline-none placeholder-gray lg:placeholder:text-xs text-md "
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
    if (value !== selectedOption.value) {
      const option = options.find((opt) => opt.value === value);
      if (option) {
        setSelectedOption(option);
      }
    }
  }, [value, options, selectedOption.value]);

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
            <span className="text-lg lg:text-base">{selectedOption.value}</span>
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

const AgeSelector = ({ onChange, className = "" }) => {
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
      placeholder="年齡"
    />
  );
};

const GenderSelector = ({ onChange, className = "", name }) => {
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
      className={className}
      placeholder="性別"
    />
  );
};

const ProductTypeSelector = ({ placeholder, onChange, className = "" }) => {
  const productOptions = [
    { value: "乾屑", label: "乾屑" },
    { value: "油屑", label: "油屑" },
  ];

  return (
    <CustomSelector
      title="申請體驗產品(乾屑/油屑)"
      options={productOptions}
      onChange={onChange}
      name="productType"
      className={className}
      placeholder={placeholder}
    />
  );
};

const FreeSection = memo(({ config }) => {
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

  const [formData, setFormData] = useState({
    lastName: "",
    phone: "",
    email: "",
    zipCode: "",
    gender: "",
    age: "",
    productType: "",
    shippingAddress: "",
    consent: false,
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
    if (!formData.lastName.trim()) {
      newErrors.lastName = "請輸入姓名";
    } else if (formData.lastName.length > 50) {
      newErrors.lastName = "姓名長度不可超過50個字元";
    } else if (/[<>'"&]/.test(formData.lastName)) {
      newErrors.lastName = "姓名不可包含特殊字元";
    } else if (!namePattern.test(formData.lastName)) {
      newErrors.lastName = "姓名只能包含中文、英文字母、空格、點(.)、連字號(-)";
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
    } else if (formData.email.length > 50) {
      newErrors.email = "電子郵件長度不可超過50個字元";
    } else if (/[<>'"&]/.test(formData.email)) {
      newErrors.email = "電子郵件不可包含特殊字元";
    }

    // ZIP code validation
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = "請輸入郵遞區號";
    } else if (!/^\d{3}$/.test(formData.zipCode)) {
      newErrors.zipCode = "郵遞區號請輸入三碼數字";
    }

    if (!formData.gender) {
      newErrors.gender = "請選取性別";
    }

    if (!formData.age) {
      newErrors.age = "請選擇年齡";
    }

    if (!formData.productType) {
      newErrors.productType = "請選擇體驗產品";
    }

    // Shipping address validation
    if (!formData.shippingAddress.trim()) {
      newErrors.shippingAddress = "請輸入寄送地址";
    } else if (formData.shippingAddress.length > 50) {
      newErrors.shippingAddress = "地址長度不可超過50個字元";
    } else if (/[<>'"&]/.test(formData.shippingAddress)) {
      newErrors.shippingAddress = "地址不可包含特殊字元";
    }

    // Consent validation
    if (!formData.consent) {
      newErrors.consent = "請同意注意事項";
    }

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
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

    // Form is valid, proceed with submission
    setSubmitted(true);
    alert("申請成功！我們將盡快與您聯絡。");
    // Here you would typically submit the data to a server
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
    <div className="-mt-[30px] z-10" id="free">
      <div className="lg:hidden block">
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
                className="w-[90%] mt-[60px]"
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
                  className="space-y-2 mx-2 mt-[50px] max-w-[680px] mx-auto"
                >
                  <div className="grid grid-cols-2 gap-y-2 gap-x-4 pt-2">
                    <CustomInput
                      label="姓名："
                      placeholder="姓名"
                      onChange={handleChange}
                      value={formData.lastName}
                      name="lastName"
                      maxLength={20}
                    />
                    <GenderSelector onChange={handleChange} />
                    <CustomInput
                      label="電話："
                      placeholder="電話 09xxxxxxxx"
                      onChange={handleChange}
                      value={formData.phone}
                      name="phone"
                      maxLength={10}
                    />
                    <AgeSelector onChange={handleChange} />
                    <CustomInput
                      label="EMAIL："
                      placeholder="EMAIL"
                      onChange={handleChange}
                      value={formData.email}
                      name="email"
                    />
                    <ProductTypeSelector onChange={handleChange} />
                  </div>
                  <div className="flex w-full gap-4">
                    <div className="w-1/3">
                      <CustomInput
                        label="郵遞區號(3碼)："
                        placeholder=""
                        onChange={handleChange}
                        value={formData.zipCode}
                        name="zipCode"
                        maxLength={3}
                      />
                    </div>
                    <div className="w-2/3">
                      <CustomInput
                        label="寄送地址："
                        placeholder="使用宅配配送，請勿使用郵政信箱收件"
                        onChange={handleChange}
                        value={formData.shippingAddress}
                        name="shippingAddress"
                      />
                    </div>
                  </div>

                  {/* Notes section */}
                  <div className="mt-6  rounded text-sm relative text-[#094A42]">
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
                  <div className="flex justify-center gap-4 mt-5 relative">
                    <button type="button">
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
        {isShowNote && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 z-50">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <img
                  src={config.desktop.freeSection.ctaNote}
                  alt="活動注意事項"
                  className="max-w-full"
                />
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                  <button onClick={handleHideNote}>
                    <img
                      src={config.desktop.freeSection.confirm}
                      alt="確認同意"
                      className="w-[200px]"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="hidden lg:block">
        <img
          src={config.mobile.freeSection.product}
          alt="product"
          className="w-full object-cover"
        />
        <div className="relative w-full px-2">
          <img
            src={config.mobile.freeSection.background}
            alt="background"
            className="absolute top-0 left-0 w-full object-cover bg-repeat-space"
          />
          <div className="mx-auto rounded-lg p-6 relative w-full max-w-[800px]">
            <img
              className="absolute top-[20vw] inset-x-0 xs:h-[480px] h-auto w-full object-cover bg-repeat-y  mx-auto max-w-[400px]"
              src={config.mobile.freeSection.tableBackground}
              alt="tableBackground"
            />
            <form
              onSubmit={handleSubmit}
              className="mx-2  max-w-[360px] mx-auto"
              style={{ marginTop: "calc(20vw + 20px)" }}
            >
              <div className="flex flex-col flex-wrap gap-y-2 pt-2 px-4">
                <div className="flex items-center">
                  <div className="relative w-[100px] text-teal text-lg text-bold mr-2">
                    真實姓名
                  </div>
                  <CustomInput
                    label="姓名："
                    placeholder="姓名"
                    onChange={handleChange}
                    value={formData.lastName}
                    name="lastName"
                    maxLength={20}
                  />
                </div>
                <div className="flex items-center">
                  <div className="relative w-[100px] text-teal text-lg text-bold mr-2">
                    性別
                  </div>
                  <GenderSelector
                    onChange={handleChange}
                    className="h-[30px]"
                  />
                </div>
                <div className="flex items-center">
                  <div className="relative w-[100px] text-teal text-lg text-bold mr-2">
                    年齡
                  </div>
                  <AgeSelector onChange={handleChange} className="h-[30px]" />
                </div>
                <div className="flex items-center">
                  <div className="relative w-[100px] text-teal text-lg text-bold mr-2">
                    EMAIL
                  </div>
                  <CustomInput
                    label="EMAIL："
                    placeholder="EMAIL"
                    onChange={handleChange}
                    value={formData.email}
                    name="email"
                  />
                </div>
                <div className="flex items-center">
                  <div className="relative w-[100px] text-teal text-lg text-bold mr-2">
                    電話
                  </div>
                  <CustomInput
                    label="電話："
                    placeholder="電話 09xxxxxxxx"
                    onChange={handleChange}
                    value={formData.phone}
                    name="phone"
                    maxLength={10}
                  />
                </div>
                <div className="flex items-center">
                  <div className="relative w-[100px] text-teal text-lg text-bold mr-2">
                    申請體驗
                  </div>
                  <ProductTypeSelector
                    onChange={handleChange}
                    placeholder="申請體驗產品(乾屑/油屑)"
                    className="h-[30px]"
                  />
                </div>

                <div className="flex items-center">
                  <div className="relative w-[100px] text-teal text-lg text-bold mr-2">
                    領取地址
                  </div>
                  <CustomInput
                    label="郵遞區號(3碼)："
                    placeholder="郵遞區號(3碼)"
                    onChange={handleChange}
                    value={formData.zipCode}
                    name="zipCode"
                    maxLength={3}
                  />
                </div>
                <div className="flex items-center">
                  <div className="relative w-[100px] text-teal text-lg text-bold mr-2" />
                  <CustomInput
                    label="寄送地址："
                    placeholder="使用宅配配送，請勿使用郵政信箱收件"
                    onChange={handleChange}
                    value={formData.shippingAddress}
                    name="shippingAddress"
                  />
                </div>
              </div>

              {/* Notes section */}
              <div className="mt-2 rounded text-xs relative text-[#094A42]">
                <div className="flex items-baseline mb-1">
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
                    src={config.mobile.freeSection.ctaProduct}
                    alt="ctaProduct"
                    className="w-[280px]"
                  />
                </button>
                <button type="button">
                  <img
                    src={config.mobile.freeSection.ctaFree}
                    alt="ctaFree"
                    className="w-[280px]"
                  />
                </button>
              </div>
            </form>
          </div>
        </div>
        {isShowNote && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 z-50">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <img
                  src={config.mobile.freeSection.ctaNote}
                  alt="活動注意事項"
                  className="max-w-full min-w-[300px]"
                />
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                  <button onClick={handleHideNote}>
                    <img
                      src={config.desktop.freeSection.confirm}
                      alt="確認同意"
                      className="w-[200px]"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

const SwiperContent = ({
  config,
  data,
  initialNumber = 3,
  id = "default",
  className="",
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
    <div className="relative w-full" id="video">
      <div className="relative w-full">
        <img
          className="w-full h-full object-cover bg-repeat-y lg:hidden block"
          src={config.desktop.videoSection.background}
          alt="background"
        />
        <img
          className="w-full h-full object-cover bg-repeat-y lg:block hidden"
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
            <img src={config.desktop.videoSection.rowCard} alt="row-card" className="w-full" />
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
          <SwiperContent config={config} data={carouselData} id="star" />
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
          className="absolute relative w-full h-full object-cover bg-repeat-y"
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
            <div className="max-w-[428px] mx-auto">
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
            <div className="max-w-[428px] mx-auto">
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
            <div className="max-w-[428px] mx-auto">
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
            <div className="max-w-[428px] mx-auto">
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
            <div className="max-w-[428px] mx-auto">
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
          className="relative w-full h-full object-cover bg-repeat-y"
        />
        <div className="absolute top-0 left-0 flex flex-col items-center justify-center w-full mt-[30vw]">
          <div className="flex flex-col justify-center items-center gap-[30px] w-[70%]">
            <div className="max-w-[428px] mx-auto">
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
            <div className="max-w-[428px] mx-auto">
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
    <div className="relative w-full" id="level">
      <div className="relative w-full">
        <img
          src={config.desktop.levelSection.background}
          alt="background"
          className="w-full h-full object-cover bg-repeat-y lg:hidden block"
        />
        <img
          src={config.mobile.levelSection.background}
          alt="background"
          className="w-full h-full object-cover bg-repeat-y lg:block hidden"
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
    <div className="relative w-full" id="real">
      <div className="relative w-full">
        <img
          src={config.desktop.realSection.background}
          alt="background"
          className="w-full h-full object-cover bg-repeat-y md:hidden block -mt-[7.5vw]"
        />
        <img
          src={config.mobile.realSection.background}
          alt="background"
          className="w-full h-full object-cover bg-repeat-y md:block hidden"
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
          className="w-full h-full object-cover bg-repeat-y"
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
            <a onClick={() => window.open(config.links.line)}>
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
          className="w-full h-full object-cover bg-repeat-y"
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
                className="w-[50px]"
              />
            </a>
            <a onClick={() => window.open(config.links.line)}>
              <img
                src={config.mobile.footer.line}
                alt="icon"
                className="w-[50px]"
              />
            </a>
            <a onClick={() => window.open(config.links.ig)}>
              <img
                src={config.mobile.footer.ig}
                alt="icon"
                className="w-[50px]"
              />
            </a>
          </div>
          <div className="flex items-center justify-center gap-[10%] mt-[1%]">
            <a onClick={() => window.open(config.links.yt)}>
              <img
                src={config.mobile.footer.yt}
                alt="icon"
                className="w-[50px]"
              />
            </a>
            <a onClick={() => window.open(config.links.fb)}>
              <img
                src={config.mobile.footer.fb}
                alt="icon"
                className="w-[50px]"
              />
            </a>
            <a onClick={() => window.open(config.links.messager)}>
              <img
                src={config.mobile.footer.messager}
                alt="icon"
                className="w-[50px]"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [staticJson, setStaticJson] = useState(STORAGE_DATA);

  useEffect(() => {
   
    const handleHashScroll = () => {
      if (window.location.hash) {
     
        const hashValue = window.location.hash;
        const id = hashValue.replace(/^#\/?/, '');
        
        const scrollAttempt = (attemptCount = 0) => {
          const element = document.getElementById(id);
          
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            console.log(`Successfully scrolled to #${id}`);
          } else if (attemptCount < 5) {
            console.log(`Element #${id} not found, retrying... (${attemptCount + 1}/5)`);
            setTimeout(() => scrollAttempt(attemptCount + 1), 300 * (attemptCount + 1));
          } else {
            console.warn(`Failed to find element #${id} after multiple attempts`);
          }
        };
        
        scrollAttempt();
      }
    };
    
    window.addEventListener('load', handleHashScroll);
    window.addEventListener('hashchange', handleHashScroll);
    
    const timeoutId = setTimeout(handleHashScroll, 1000);
    
    return () => {
      window.removeEventListener('load', handleHashScroll);
      window.removeEventListener('hashchange', handleHashScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div>
      <Header config={staticJson.config} />
      <Banner config={staticJson.config} />
      <GameSection config={staticJson.config} />
      <FreeSection config={staticJson.config} />
      <PrizeSection config={staticJson.config} />
      <VideoSection config={staticJson.config} />
      <RecommendSection config={staticJson.config} />
      <LevelSection config={staticJson.config} />
      <RealSection config={staticJson.config} />
      <Footer config={staticJson.config} />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
