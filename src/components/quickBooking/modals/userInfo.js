import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";
import { usePathname } from "next/navigation";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import "react-day-picker/style.css"
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import PhoneInput from "react-phone-input-2";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import * as gtag from "../../../lib/gtag";
import LoadingButton from "@/components/shared/button/LoadingButton";
import {
  handleStep,
  manageSchedulerResponse,
  quickBookingSliceSelector,
} from "@/redux/quickBooking";
import { API_ROUTER } from "@/services/apiRouter";
import { Button, FormGroup, Image, Input, Label, } from "@/styles/global/main.style";
import { SchedulerModalLayoutWrapper } from "@/styles/pages/scheduler.style";
import axiosApiCall from "@/utils/axios";
import "react-calendar/dist/Calendar.css";


const userInfo = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const calendarRef = useRef(null);
  const calendarRef1 = useRef(null);
  const calendarRef2 = useRef(null);
  const calendarRef3 = useRef(null);
  const calendarRef4 = useRef(null);

  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [isCalendarVisible1, setIsCalendarVisible1] = useState(false);
  const [isCalendarVisible2, setIsCalendarVisible2] = useState(false);
  const [isCalendarVisible3, setIsCalendarVisible3] = useState(false);
  const [isCalendarVisible4, setIsCalendarVisible4] = useState(false);

  //mainUser
  const [stopEditEmail, setStopEditEmail] = useState(false);
  const [stopEditName, setStopEditName] = useState(false);
  const [stopEditDOB, setStopEditDOB] = useState(false);

  //guest1
  //const [stopEdit1, setStopEdit1] = useState(false);
  const [stopEdit1Name, setStop1EditName] = useState(false);
  const [stopEdit1DOB, setStop1EditDOB] = useState(false);

  //guest2
  //const [stopEdit2, setStopEdit2] = useState(false);
  const [stopEdit2Name, setStop2EditName] = useState(false);
  const [stopEdit2DOB, setStop2EditDOB] = useState(false);

  //guest3
  //const [stopEdit3, setStopEdit3] = useState(false);
  const [stopEdit3Name, setStop3EditName] = useState(false);
  const [stopEdit3DOB, setStop3EditDOB] = useState(false);

  //guest4
  const [stopEdit4Name, setStop4EditName] = useState(false);
  const [stopEdit4DOB, setStop4EditDOB] = useState(false);
  //const [stopEdit4, setStopEdit4] = useState(false);


   const [currentMonth, setCurrentMonth] = useState();

     const dayPickerRef = useRef(null);

  const [date, setDate] = useState(null);
  const [date1, setDate1] = useState(null);
  const [date2, setDate2] = useState(null);
  const [date3, setDate3] = useState(null);
  const [date4, setDate4] = useState(null);
  const [phNo, setPhNo] = useState({
    countryCode: "",
    number: "",
  });
  const [guest1phNo, setguest1PhNo] = useState({
    countryCode: "",
    number: "",
  });
  const [guest2phNo, setguest2PhNo] = useState({
    countryCode: "",
    number: "",
  });
  const [guest3phNo, setguest3PhNo] = useState({
    countryCode: "",
    number: "",
  });
  const [guest4phNo, setguest4PhNo] = useState({
    countryCode: "",
    number: "",
  });
  const { schedulerResponse, schedulerData } = useSelector(quickBookingSliceSelector);
  const number = schedulerResponse?.userInfo?.countrycode + schedulerResponse?.userInfo?.phone;
  const number1 =
    schedulerResponse?.userInfo?.guest1?.countrycode + schedulerResponse?.userInfo?.guest1?.phone;
  const number2 =
    schedulerResponse?.userInfo?.guest2?.countrycode + schedulerResponse?.userInfo?.guest2?.phone;
  const number3 =
    schedulerResponse?.userInfo?.guest3?.countrycode + schedulerResponse?.userInfo?.guest3?.phone;
  const number4 =
    schedulerResponse?.userInfo?.guest4?.countrycode + schedulerResponse?.userInfo?.guest4?.phone;
  const dispatch = useDispatch();

  const defaultValues = useMemo(
    () => ({
      dob: null,
      phoneNumber: number || "",
      name: "",
      email: "",
      guest1name: "",
      guest1dob: null,
      guest1phoneNumber: number1 || "",
      guest2name: "",
      guest2dob: null,
      guest2phoneNumber: number2 || "",
      guest3name: "",
      guest3dob: null,
      guest3phoneNumber: number3 || "",
      guest4name: "",
      guest4dob: null,
      guest4phoneNumber: number4 || "",
      listInfo: false,
      mainNote: "",
      noteGuest1: "",
      noteGuest2: "",
      noteGuest3: "",
      noteGuest4: "",
    }),
    [schedulerResponse]
  );

  // validation
  const formSchema = yup.object().shape({
    guest: yup.number(),
    email: yup
      .string()
      .required("Email is required")
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i, "Invalid email format."),
    phoneNumber: yup
      .string()
      .transform((value, originalValue) => {
        const cleanedValue = originalValue.replace(/[- )(]/g, "");
        return cleanedValue;
      })
      .required("Phone Number is required")
      .min(11, "Please enter a valid phone number"),
    name: yup
      .string()
      .required("Name is required")
      .max(30, "Name should be Less than 50 characters")
      .matches(/^[A-Za-z]+( [A-Za-z]+)*\s*$/, "Please enter valid name"),
    mainNote: yup
      .string()
      .notRequired()
      .nullable()
      .test("is-not-number", "Note must be a valid string, not a number", (value) => {
        if (value == "") {
          return true;
        } else if (/^[0-9]+$/.test(value)) {
          return false;
        } else if (/^[a-zA-Z0-9]+$/.test(value)) {
          return true;
        } else {
          return true;
        }
      }),
    noteGuest1: yup
      .string()
      .notRequired()
      .nullable()
      .test("is-not-number", "Note must be a valid string, not a number", (value) => {
        if (value == "") {
          return true;
        } else if (/^[0-9]+$/.test(value)) {
          return false;
        } else if (/^[a-zA-Z0-9]+$/.test(value)) {
          return true;
        } else {
          return true;
        }
      }),
    noteGuest2: yup
      .string()
      .notRequired()
      .nullable()
      .test("is-not-number", "Note must be a valid string, not a number", (value) => {
        if (value == "") {
          return true;
        } else if (/^[0-9]+$/.test(value)) {
          return false;
        } else if (/^[a-zA-Z0-9]+$/.test(value)) {
          return true;
        } else {
          return true;
        }
      }),
    noteGuest3: yup
      .string()
      .notRequired()
      .nullable()
      .test("is-not-number", "Note must be a valid string, not a number", (value) => {
        if (value == "") {
          return true;
        } else if (/^[0-9]+$/.test(value)) {
          return false;
        } else if (/^[a-zA-Z0-9]+$/.test(value)) {
          return true;
        } else {
          return true;
        }
      }),
    noteGuest4: yup
      .string()
      .notRequired()
      .nullable()
      .test("is-not-number", "Note must be a valid string, not a number", (value) => {
        if (value == "") {
          return true;
        } else if (/^[0-9]+$/.test(value)) {
          return false;
        } else if (/^[a-zA-Z0-9]+$/.test(value)) {
          return true;
        } else {
          return true;
        }
      }),
    guest1name: yup.string().when("guest", {
      is: (val) => val > 0,
      then: (schema) =>
        schema
          .matches(/^[A-Za-z]+( [A-Za-z]+)*\s*$/, "Please enter valid name")
          .required("Guest-1 name is required"),
      otherwise: (schema) => schema.nullable(),
    }),
    guest1phoneNumber: yup.string().when("guest", {
      is: (val) => val > 0,
      then: (schema) =>
        schema
          .required("Guest-1 phone number is required")
          .transform((value, originalValue) => {
            const cleanedValue = originalValue.replace(/[- )(]/g, "");
            return cleanedValue;
          })
          .min(11, "Please enter a valid phone number"),
      otherwise: (schema) => schema.nullable(),
    }),
    guest2name: yup.string().when("guest", {
      is: (val) => val > 1,
      then: (schema) =>
        schema
          .matches(/^[A-Za-z]+( [A-Za-z]+)*\s*$/, "Please enter valid name")
          .required("Guest-2 name is required"),
      otherwise: (schema) => schema.nullable(),
    }),
    guest2phoneNumber: yup.string().when("guest", {
      is: (val) => val > 1,
      then: (schema) =>
        schema
          .required("Guest-2 phone number is required")
          .transform((value, originalValue) => {
            const cleanedValue = originalValue.replace(/[- )(]/g, "");
            return cleanedValue;
          })
          .min(11, "Please enter a valid phone number"),
      otherwise: (schema) => schema.nullable(),
    }),
    guest3name: yup.string().when("guest", {
      is: (val) => val > 2,
      then: (schema) =>
        schema
          .matches(/^[A-Za-z]+( [A-Za-z]+)*\s*$/, "Please enter valid name")
          .required("Guest-3 name is required"),
      otherwise: (schema) => schema.nullable(),
    }),
    guest3phoneNumber: yup.string().when("guest", {
      is: (val) => val > 2,
      then: (schema) =>
        schema
          .required("Guest-3 phone number is required")
          .transform((value, originalValue) => {
            const cleanedValue = originalValue.replace(/[- )(]/g, "");
            return cleanedValue;
          })
          .min(11, "Please enter a valid phone number"),
      otherwise: (schema) => schema.nullable(),
    }),
    guest4name: yup.string().when("guest", {
      is: (val) => val > 3,
      then: (schema) =>
        schema
          .matches(/^[A-Za-z]+( [A-Za-z]+)*\s*$/, "Please enter valid name")
          .required("Guest-4 name is required"),
      otherwise: (schema) => schema.nullable(),
    }),
    guest4phoneNumber: yup.string().when("guest", {
      is: (val) => val > 3,
      then: (schema) =>
        schema
          .required("Guest-4 phone number is required")
          .transform((value, originalValue) => {
            const cleanedValue = originalValue.replace(/[- )(]/g, "");
            return cleanedValue;
          })
          .min(11, "Please enter a valid phone number"),
      otherwise: (schema) => schema.nullable(),
    }),
    listInfo: yup.boolean().oneOf([true], "You must check this box to proceed"),
  });

  // Form Hooks
  const methods = useForm({
    resolver: yupResolver(formSchema),
    defaultValues,
  });

  const {
    register,
    handleSubmit,
    control,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = methods;
  useEffect(() => {
    if (schedulerResponse) {
      setValue("guest", schedulerResponse?.guest);
    }
    if (schedulerResponse?.userInfo) {
      // CheckPhone(
      //   schedulerResponse?.userInfo?.countrycode,
      //   schedulerResponse?.userInfo?.phone,
      //   0,
      //   schedulerResponse?.userInfo
      // );
        if (schedulerResponse?.userInfo?.client_dob) {
          const parsedDate = moment(schedulerResponse?.userInfo?.client_dob, "MM-DD-YYYY").toDate();
          setCurrentMonth(parsedDate);
          setValue("dob", schedulerResponse?.userInfo?.client_dob);
        }
      setValue("email", schedulerResponse?.userInfo?.email);
      setValue("name", schedulerResponse?.userInfo?.name);
      setValue("mainNote", schedulerResponse?.userInfo?.notes);
      setDate(schedulerResponse?.userInfo?.client_dob);
      setPhNo({
        countryCode: schedulerResponse?.userInfo?.countrycode,
        number: schedulerResponse?.userInfo?.phone,
      });
    }
    // if (schedulerResponse?.userInfo?.guest1) {
    //   CheckPhone(
    //     schedulerResponse?.userInfo?.guest1?.countrycode,
    //     schedulerResponse?.userInfo?.guest1?.phone,
    //     1,
    //     schedulerResponse?.userInfo?.guest1
    //   );

    //   setValue("guest1dob", schedulerResponse?.userInfo?.guest1?.dob || null);
    //   // setValue('guest1phoneNumber', schedulerResponse?.userInfo?.email)
    //   setValue("guest1name", schedulerResponse?.userInfo?.guest1?.name);
    //   setDate1(schedulerResponse?.userInfo?.guest1?.dob || "");
    //   setguest1PhNo({
    //     countryCode: schedulerResponse?.userInfo?.guest1?.countrycode,
    //     number: schedulerResponse?.userInfo?.guest1?.phone,
    //   });
    //   setValue("noteGuest1", schedulerResponse?.userInfo?.guest1?.notes);
    // }
    // if (schedulerResponse?.userInfo?.guest2) {
    //   CheckPhone(
    //     schedulerResponse?.userInfo?.guest2?.countrycode,
    //     schedulerResponse?.userInfo?.guest2?.phone,
    //     2,
    //     schedulerResponse?.userInfo?.guest2
    //   );

    //   setValue("guest2dob", schedulerResponse?.userInfo?.guest2?.dob || null);
    //   // setValue('guest1phoneNumber', schedulerResponse?.userInfo?.email)
    //   setValue("guest2name", schedulerResponse?.userInfo?.guest2?.name);
    //   setDate2(schedulerResponse?.userInfo?.guest2?.dob || "");
    //   setguest2PhNo({
    //     countryCode: schedulerResponse?.userInfo?.guest2?.countrycode,
    //     number: schedulerResponse?.userInfo?.guest2?.phone,
    //   });
    //   setValue("noteGuest2", schedulerResponse?.userInfo?.guest2?.notes);
    // }
    // if (schedulerResponse?.userInfo?.guest3) {
    //   CheckPhone(
    //     schedulerResponse?.userInfo?.guest3?.countrycode,
    //     schedulerResponse?.userInfo?.guest3?.phone,
    //     3,
    //     schedulerResponse?.userInfo?.guest3
    //   );

    //   setValue("guest3dob", schedulerResponse?.userInfo?.guest3?.dob || null);
    //   // setValue('guest1phoneNumber', schedulerResponse?.userInfo?.email)
    //   setValue("guest3name", schedulerResponse?.userInfo?.guest3?.name);
    //   setDate3(schedulerResponse?.userInfo?.guest3?.dob || "");
    //   setguest3PhNo({
    //     countryCode: schedulerResponse?.userInfo?.guest3?.countrycode,
    //     number: schedulerResponse?.userInfo?.guest3?.phone,
    //   });
    //   setValue("noteGuest3", schedulerResponse?.userInfo?.guest3?.notes);
    // }
    // if (schedulerResponse?.userInfo?.guest4) {
    //   CheckPhone(
    //     schedulerResponse?.userInfo?.guest4?.countrycode,
    //     schedulerResponse?.userInfo?.guest4?.phone,
    //     4,
    //     schedulerResponse?.userInfo?.guest4
    //   );

    //   setValue("guest4dob", schedulerResponse?.userInfo?.guest4?.dob || null);
    //   // setValue('guest1phoneNumber', schedulerResponse?.userInfo?.email)
    //   setValue("guest4name", schedulerResponse?.userInfo?.guest4?.name);
    //   setDate4(schedulerResponse?.userInfo?.guest4?.dob || "");
    //   setguest4PhNo({
    //     countryCode: schedulerResponse?.userInfo?.guest4?.countrycode,
    //     number: schedulerResponse?.userInfo?.guest4?.phone,
    //   });
    //   setValue("noteGuest4", schedulerResponse?.userInfo?.guest4?.notes);
    // }
  }, [schedulerResponse]);

  const onSubmitForm = (formData) => {

    if (process.env.SERVER_TYPE == "production") {
        gtag.trackBookingEvent("step-3", {
          label: schedulerData?.data?.username,
          url: `${window.location.href}/step-3`,
        });
        window.gtag('event', 'conversion', {'send_to': 'AW-11564679938/ylZZCNnV_6gaEIKGvIor'});
    }
    try {
      setLoading(true);
      const userInfo = {
        phone: phNo?.number,
        countrycode: phNo?.countryCode,
        email: formData?.email,
        name: formData?.name,
        client_dob: formData?.dob,
        notes: formData?.mainNote ? formData?.mainNote : "",
      };

      // if (formData?.guest > 0) {
      //   userInfo.guest1 = {
      //     name: formData?.guest1name,
      //     phone: guest1phNo?.number,
      //     countrycode: guest1phNo?.countryCode,
      //     guestDob: formData?.guest1dob ? moment(formData?.guest1dob).format("YYYY-MM-DD") : null,
      //     notes: formData?.noteGuest1 ? formData?.noteGuest1 : "",
      //   };
      // }
      // if (formData?.guest > 1) {
      //   userInfo.guest2 = {
      //     name: formData?.guest2name,
      //     phone: guest2phNo?.number,
      //     countrycode: guest2phNo?.countryCode,
      //     guestDob: formData?.guest2dob ? moment(formData?.guest2dob).format("YYYY-MM-DD") : null,
      //     notes: formData?.noteGuest2 ? formData?.noteGuest2 : "",
      //   };
      // }
      // if (formData?.guest > 2) {
      //   userInfo.guest3 = {
      //     name: formData?.guest3name,
      //     phone: guest3phNo?.number,
      //     countrycode: guest3phNo?.countryCode,
      //     guestDob: formData?.guest3dob ? moment(formData?.guest3dob).format("YYYY-MM-DD") : null,
      //     notes: formData?.noteGuest3 ? formData?.noteGuest3 : "",
      //   };
      // }
      // if (formData?.guest > 3) {
      //   userInfo.guest4 = {
      //     name: formData?.guest4name,
      //     phone: guest4phNo?.number,
      //     countrycode: guest4phNo?.countryCode,
      //     guestDob: formData?.guest4dob ? moment(formData?.guest4dob).format("YYYY-MM-DD") : null,
      //     notes: formData?.noteGuest4 ? formData?.noteGuest4 : "",
      //   };
      // }
      dispatch(manageSchedulerResponse({ ...schedulerResponse, userInfo: userInfo }));
      setLoading(false);
      dispatch(handleStep(8));
    } catch (error) {}
  };

  const goBack = () => {
    if (schedulerResponse?.guest == 0) {
      dispatch(handleStep(2));
    }
    if (schedulerResponse?.guest == 1) {
      dispatch(handleStep(3));
    }
    if (schedulerResponse?.guest == 2) {
      dispatch(handleStep(4));
    }
    if (schedulerResponse?.guest == 3) {
      dispatch(handleStep(5));
    }
    if (schedulerResponse?.guest == 4) {
      dispatch(handleStep(6));
    }
  };

  const CheckPhone = async (countrycode, phonenumber, guestIndex, filledValue = null) => {
    const params = {
      spId: schedulerData?.sp_id,
      phone: phonenumber,
      countrycode: `+${countrycode}`,
    };
    try {
      const res = await axiosApiCall.post(API_ROUTER?.CHECK_USER_PHONE, params);

      if (!res?.status) {
        switch (guestIndex) {
          case 0:
            //setStopEdit(true);
            setStopEditEmail(false);
            setStopEditName(false);
            setStopEditDOB(false);
            setValue("email", filledValue?.email || '');

            if(filledValue?.name) {
               setValue("name", filledValue?.name);
            }

            setValue("dob", filledValue?.client_dob ? moment(filledValue?.client_dob).format("MM-DD-YYYY") : null);
            setDate( filledValue?.client_dob ? moment(filledValue?.client_dob).format("MM-DD-YYYY") : null);
            break;
          case 1:
            setStop1EditName(false);
            setStop1EditDOB(false);
            //setStopEdit1(false);
            setValue("guest1dob", filledValue?.guestDob || null);
            setValue("guest1name", filledValue?.name || "");
            setDate1(filledValue?.guestDob || "");
            break;
          case 2:
            setStop2EditName(false);
            setStop2EditDOB(false);
            //setStopEdit2(true);
            setValue("guest2name", filledValue?.name || "");
            setValue("guest2dob", filledValue?.guestDob || null);
            setDate2(filledValue?.guestDob || "");
            break;
          case 3:
            setStop3EditName(false);
            setStop3EditDOB(false);
            //setStopEdit3(true);
            setValue("guest3dob", filledValue?.guestDob || null);
            setValue("guest3name", filledValue?.name || "");
            setDate3(filledValue?.guestDob || "");
            break;
          case 4:
            setStop4EditName(false);
            setStop4EditDOB(false);
            //setStopEdit4(true);
            setValue("guest4dob", filledValue?.guestDob || null);
            setValue("guest4name", filledValue?.name || "");
            setDate4(filledValue?.guestDob || "");
            break;
        }
        return res?.message;
      } else {
        if (res?.data?.status) {
          switch (guestIndex) {
            case 0:
              if (!res?.data?.data?.email || res?.data?.data?.email == "") {
                setStopEditEmail(false);
                setValue("email", filledValue?.email || "");
              } else {
                setStopEditEmail(true);
                setValue("email", res?.data?.data?.email);
                clearErrors("email");
              }

              if (!res?.data?.data?.username) {
                setStopEditName(false);
              } else {
                setStopEditName(true);
                setValue("name", res?.data?.data?.username);
                clearErrors("name");
              }

              if (!res?.data?.data?.dob) {
                setStopEditDOB(false);
                setDate(null);
                setValue("dob", null);
              } else {
                setStopEditDOB(true);
                  setValue("dob", res?.data?.data?.dob ? moment(res?.data?.data?.dob).format("MM-DD-YYYY") : null);
                  setDate(res?.data?.data?.dob ? moment(res?.data?.data?.dob).format("MM-DD-YYYY") : null);
              }

              // setStopEdit(true);
              // setValue("email", res?.data?.data?.email);
              // setValue("name", res?.data?.data?.username);
              // setValue("dob", res?.data?.data?.dob);
              // setDate(res?.data?.data?.dob);
              break;
            case 1:
              if (!res?.data?.data?.username) {
                setStop1EditName(false);
              } else {
                setStop1EditName(true);
                setValue("guest1name", res?.data?.data?.username);
                clearErrors("guest1name");
              }

              if (!res?.data?.data?.dob) {
                setStop1EditDOB(false);
                setDate1(null);
                setValue("guest1dob", null);
              } else {
                setValue(
                  "guest1dob",
                  res?.data?.data?.dob
                    ? moment(res?.data?.data?.dob, "yyyy-MM-DD").format("yyyy-MM-DD")
                    : null
                );
                setDate1(moment(res?.data?.data?.dob, "yyyy-MM-DD").format("yyyy-MM-DD"));
                setStop1EditDOB(true);
                clearErrors("guest1dob");
              }

              // setStopEdit1(true);
              // setValue("guest1dob", res?.data?.data?.dob);
              // setValue("guest1name", res?.data?.data?.username);
              // setDate1(res?.data?.data?.dob);
              break;
            case 2:
              if (!res?.data?.data?.username) {
                setStop2EditName(false);
              } else {
                setStop2EditName(true);
                setValue("guest2name", res?.data?.data?.username);
                clearErrors("guest2name");
              }

              if (!res?.data?.data?.dob) {
                setStop2EditDOB(false);
                setDate2(null);
                setValue("guest2dob", null);
              } else {
                setStop2EditDOB(true);
                setValue("guest2dob", res?.data?.data?.dob);
                setDate2(res?.data?.data?.dob);
                clearErrors("guest2dob");
              }
              // setStopEdit2(true);
              // setValue("guest2name", res?.data?.data?.username);
              // setValue("guest2dob", res?.data?.data?.dob);

              // setDate2(res?.data?.data?.dob);
              break;
            case 3:
              if (!res?.data?.data?.username) {
                setStop3EditName(false);
              } else {
                setStop3EditName(true);
                setValue("guest3name", res?.data?.data?.username);
                clearErrors("guest3name");
              }

              if (!res?.data?.data?.dob) {
                setStop3EditDOB(false);
                setDate3(null);
                setValue("guest3dob", null);
              } else {
                setStop3EditDOB(true);
                setValue("guest3dob", res?.data?.data?.dob);
                setDate3(res?.data?.data?.dob);
                clearErrors("guest3dob");
              }

              // setStopEdit3(true);
              // setValue("guest3dob", res?.data?.data?.dob);
              // setValue("guest3name", res?.data?.data?.username);
              // setDate3(res?.data?.data?.dob);
              break;
            case 4:
              if (!res?.data?.data?.username) {
                setStop4EditName(false);
              } else {
                setStop4EditName(true);
                setValue("guest4name", res?.data?.data?.username);
                clearErrors("guest4name");
              }

              if (!res?.data?.data?.dob) {
                setStop4EditDOB(false);
                setDate4(null);
                setValue("guest4dob", null);
              } else {
                setStop4EditDOB(true);
                setValue("guest4dob", res?.data?.data?.dob);
                setDate4(res?.data?.data?.dob);
                clearErrors("guest4dob");
              }
              // setStopEdit4(true);
              // setValue("guest4dob", res?.data?.data?.dob);
              // setValue("guest4name", res?.data?.data?.username);
              // setDate4(res?.data?.data?.dob);
              break;
          }
        }
        // toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
      }
    } catch (error) {
      // toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
      return error;
    }
  };



  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dayPickerRef.current && !dayPickerRef.current.contains(event.target)) {
        setIsCalendarVisible(false);
      }
    };

    if (isCalendarVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCalendarVisible]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef1.current && !calendarRef1.current.contains(event.target)) {
        setIsCalendarVisible1(false);
      }
    };

    if (isCalendarVisible1) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCalendarVisible1]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef2.current && !calendarRef2.current.contains(event.target)) {
        setIsCalendarVisible2(false);
      }
    };

    if (isCalendarVisible2) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCalendarVisible2]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef3.current && !calendarRef3.current.contains(event.target)) {
        setIsCalendarVisible3(false);
      }
    };

    if (isCalendarVisible3) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCalendarVisible3]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef4.current && !calendarRef4.current.contains(event.target)) {
        setIsCalendarVisible4(false);
      }
    };

    if (isCalendarVisible4) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCalendarVisible4]);

  useEffect(() => {
    if (process.env.SERVER_TYPE == "production") {
      const handleRouteChange = () => {
      const url = `${window.location.href}/step-3`;
        gtag.pageview(url);
      };
      handleRouteChange();
    }


  }, []);

 const handleDateSelect = (selectedDate) => {
  if (selectedDate) {
    // Ensure the date is a valid Date object
    const validDate = new Date(selectedDate);
    if (!isNaN(validDate.getTime())) {
      setDate(moment(validDate).format("MM-DD-YYYY"));
      setCurrentMonth(validDate);
      setValue("dob", moment(validDate).format("MM-DD-YYYY"));
      clearErrors("dob");
    }
  }
  setIsCalendarVisible(false);
};

useEffect(() => {
  // Wait for the DOM to fully load
  const selectedFlag = document.querySelector('.selected-flag');

  // Check if the element exists to avoid errors
  if (selectedFlag) {
    // Create a new <p> element with the content you want
    const countryCodeText = document.createElement('p');
    countryCodeText.innerText = '+1';
    countryCodeText.className = 'country-code-text';

    // Insert the <p> after the selected-flag
    selectedFlag.insertAdjacentElement('afterend', countryCodeText);
  }
}, []);


  return (
    <>
      <SchedulerModalLayoutWrapper className="mobile-width-wrapper">
        <div className="sit-step-display-div">
          <h5>Step 3 of 4</h5>
          <div className="step-content-wrapper">
            <div className="step-note-div active">
              <div className="step-round-wrapper">
                <span className="number-text">1</span>
                <span className="checkmark-icon">
                    <Image isContainImg={true} alt="sitback" src="/images/white-checkmark-icon.svg" />
                </span>
              </div>
            </div>
            <div className="step-note-div active">
              <div className="step-round-wrapper">
                <span className="number-text">2</span>
                <span className="checkmark-icon">
                    <Image isContainImg={true} alt="sitback" src="/images/white-checkmark-icon.svg" />
                </span>
              </div>
            </div>
            <div className="step-note-div single-first-round-active">
              <div className="step-round-wrapper">
                <span className="number-text">3</span>
                <span className="checkmark-icon">
                    <Image isContainImg={true} alt="sitback" src="/images/white-checkmark-icon.svg" />
                </span>
              </div>
            </div>
            <div className="step-note-div">
              <div className="step-round-wrapper">
                <span className="number-text">4</span>
                <span className="checkmark-icon">
                    <Image isContainImg={true} alt="sitback" src="/images/white-checkmark-icon.svg" />
                </span>
              </div>
            </div>
          </div>
        </div>
        <Form onSubmit={handleSubmit(onSubmitForm)}>
          <FormGroup controlId="formBasicEmail" className="marging-bottom-wrapper">
            <div className="text-center mb-2">
            <Label className="appointment-updated-text" style={{fontWeight: '600'}}>Who’s this appointment request for?</Label>
            </div>
          </FormGroup>

          <div className="yourself-guest-detail">
            {/* <h6>{t("you")}:</h6> */}

            <FormGroup controlId="formBasicEmail" className="marging-bottom-wrapper">
              <Label>*Full Name</Label>
              <Input
                type="text"
                name="name"
                placeholder="Mark Anthony"
                {...register("name")}
                disabled={stopEditName ? true : false}
              />
              <p className="text-danger phone_input mt-1">{errors?.name?.message}</p>
            </FormGroup>
              <FormGroup controlId="formBasicEmail" className="marging-bottom-wrapper">
              <Label>*Phone Number</Label>
              <div className="phone-wrapper">
             <PhoneInput
                placeholder={"(123) 456-7890"}
                specialLabel={"Phone Number"}
                name="phoneNumber"
                country={"us"}
                onlyCountries={["us"]} // Restrict to U.S. numbers only
                disableDropdown={true} // Prevent country change
                disableCountryCode={true}
                className="phone-number-input-wrapper"
                value={`${defaultValues?.phoneNumber || ""}`}
                onChange={(phone, data, event, formattedValue) => {
                  let rawNumber = formattedValue.replace(/\D/g, ""); // Remove all non-numeric character
                  setPhNo({ countryCode: "1", number: rawNumber });

                  if (rawNumber.length === 10) {
                    CheckPhone("1", rawNumber, 0);
                    clearErrors("phoneNumber");
                  } else {
                    setError("phoneNumber", { message: "Please enter valid phone number." });
                  }

                  // Always restore "+1"
                  setValue("phoneNumber", `+1 ${rawNumber}`);
                }}

              />
              </div>

              <p className="text-danger phone_input mt-1">{errors?.phoneNumber?.message}</p>
            </FormGroup>

            <FormGroup controlId="formBasicEmail" className="marging-bottom-wrapper">
              <Label>*Email Address</Label>
              <Input
                type="email"
                name="email"
                placeholder="markanthony002@gmail.com"
                {...register("email")}
                disabled={stopEditEmail ? true : false}
              />
              <p className="text-danger phone_input mt-1">{errors?.email?.message}</p>
            </FormGroup>
            {/* <FormGroup
              controlId="formBasicEmail"
              className={`white-input-wrapper  ${isCalendarVisible ? "show-calendar" : ""}`}
            >
              <Label>{t("dob")}</Label>

                  <Input
                    type="text"
                    placeholder="Select birth date"
                    onClick={() => setIsCalendarVisible(true)}
                    disabled={stopEditDOB ? true : false}
                    value={date  || ''}
                  />
                  {isCalendarVisible && (
                      <div className="calendarv2-wrapper-div" ref={dayPickerRef}>
                        <Controller
                          name="date"
                          control={control}
                          render={({ field }) => (
                            <DayPicker
                              mode="single"
                              captionLayout="dropdown"
                             fromYear = {new Date().getFullYear() - 100}
                              toYear={new Date().getFullYear()} // Only allow past years
                             selected={date ? date : ''}
                              month={currentMonth}
                              onSelect={(date) => handleDateSelect(date)}
                              onMonthChange={(month) => setCurrentMonth(month)}
                              disabled={{
                                after: new Date(), // Prevent future date selection
                              }}
                              styles={{
                                dropdown: {
                                  backgroundColor: "#ffffff",
                                  border: "none",
                                  borderRadius: "5px",
                                  padding: "10px",
                                  overflow: "hidden",
                                  minWidth: "70px",
                                  color: "#295086",
                                },
                              }}
                            />
                          )}
                        />
                      </div>
                    )}
              <p className="text-danger phone_input mt-1">{errors?.dob?.message}</p>
            </FormGroup> */}
            <FormGroup className="formBasicEmail">
              <Label>Special Requests (Optional)</Label>
              <Input
                type="text"
                placeholder="Allergy with palm oil, nuts oil"
                as="textarea"
                rows={5}
                className="textarea-input"
                {...register("mainNote")}
              />
              <p className="text-danger mt-1">{errors?.mainNote?.message}</p>
            </FormGroup>
          </div>
          {/* {schedulerResponse?.guest > 0 && (
            <div className="yourself-guest-detail">
              <h6>{t("guest")} # 1:</h6>
              <FormGroup controlId="formBasicEmail" className="marging-bottom-wrapper">
                <Label>{t("phone")} #</Label>
                <PhoneInput
                  placeholder={"01-000-0000"}
                  specialLabel={"phonenumber"}
                  name="guest1phoneNumber"
                  country={"us"}
                  className="phone-number-input-wrapper"
                  value={defaultValues?.guest1phoneNumber.toString()}
                  onChange={(phone, data, event, formattedValue, handleChange) => {
                    let countryCode = formattedValue.split(" ")[0];
                    let filedValue = formattedValue
                      ?.slice(countryCode.length + 1)
                      ?.replace(/[- )(]/g, "");
                    setguest1PhNo({ countryCode: data?.dialCode, number: filedValue });
                    if (data?.dialCode && filedValue.toString().length === 10) {
                      CheckPhone(data?.dialCode, filedValue, 1);
                    }
                    setValue("guest1phoneNumber", formattedValue);
                    if (
                      !(
                        data?.format?.replace(/[- )(]/g, "").length - countryCode.length ==
                        filedValue.length
                      )
                    ) {
                      setError("guest1phoneNumber", {
                        message: "Please enter valid phone number.",
                      });
                    } else {
                      clearErrors("guest1phoneNumber");
                    }
                  }}
                />
                <p className="text-danger phone_input mt-1">{errors?.guest1phoneNumber?.message}</p>
              </FormGroup>
              <FormGroup controlId="formBasicEmail" className="marging-bottom-wrapper">
                <Label>{t("name")}</Label>
                <Input
                  type="type"
                  placeholder="Mark anthony"
                  {...register("guest1name")}
                  disabled={stopEdit1Name ? true : false}
                />
                <p className="text-danger phone_input mt-1">{errors?.guest1name?.message}</p>
              </FormGroup>
              <FormGroup
                controlId="formBasicEmail"
                className="marging-bottom-wrapper show-calendar"
              >
                <Label>
                  {t("dob")} <span>({t("optional")})</span>
                </Label>
                <Input
                  type="text"
                  placeholder="1990-12-10"
                  value={date1 ? moment(date1).format("yyyy-MM-DD") : ""}
                  onClick={() => setIsCalendarVisible1(true)}
                  disabled={stopEdit1DOB ? true : false}
                />
                <div className="calendar-wrapper-div" ref={calendarRef1}>
                  {isCalendarVisible1 && (
                    <Controller
                      name="guest1dob"
                      control={control}
                      render={({ field }) => (
                        <Calendar
                          dateFormat="YYYY-MM-DD"
                          // {...field}
                          value={field?.value && field?.value}
                          maxDate={new Date()}
                          onChange={(e) => {
                            field.onChange(e);
                            setDate1(e);
                            setIsCalendarVisible1(false);
                          }}
                        />
                      )}
                    />
                  )}
                </div>
              </FormGroup>
              <FormGroup>
                <Label>Special Requests:</Label>
                <Input
                  type="text"
                  placeholder="Allergy with palm oil. nuts oil"
                  className=""
                  as="textarea"
                  rows={5}
                  {...register("noteGuest1")}
                />
                <p className="text-danger mt-1">{errors?.noteGuest1?.message}</p>
              </FormGroup>
            </div>
          )}
          {schedulerResponse?.guest > 1 && (
            <div className="yourself-guest-detail">
              <h6>{t("guest")} # 2:</h6>
              <FormGroup controlId="formBasicEmail" className="marging-bottom-wrapper">
                <Label>{t("phone")} #</Label>
                <PhoneInput
                  placeholder={"01-000-0000"}
                  specialLabel={"phonenumber"}
                  name="guest2phoneNumber"
                  country={"us"}
                  className="phone-number-input-wrapper"
                  value={defaultValues?.guest2phoneNumber.toString()}
                  onChange={(phone, data, event, formattedValue, handleChange) => {
                    let countryCode = formattedValue.split(" ")[0];
                    let filedValue = formattedValue
                      ?.slice(countryCode.length + 1)
                      ?.replace(/[- )(]/g, "");
                    setguest2PhNo({ countryCode: data?.dialCode, number: filedValue });
                    if (data?.dialCode && filedValue.toString().length === 10) {
                      CheckPhone(data?.dialCode, filedValue, 2);
                    }
                    setValue("guest2phoneNumber", formattedValue);
                    if (
                      !(
                        data?.format?.replace(/[- )(]/g, "").length - countryCode.length ==
                        filedValue.length
                      )
                    ) {
                      setError("guest2phoneNumber", {
                        message: "Please enter valid phone number.",
                      });
                    } else {
                      clearErrors("guest2phoneNumber");
                    }
                  }}
                />
                <p className="text-danger phone_input mt-1">{errors?.guest2phoneNumber?.message}</p>
              </FormGroup>
              <FormGroup controlId="formBasicEmail" className="marging-bottom-wrapper">
                <Label>{t("name")}</Label>
                <Input
                  type="type"
                  placeholder="Mark anthony"
                  {...register("guest2name")}
                  disabled={stopEdit2Name ? true : false}
                />
                <p className="text-danger phone_input mt-1">{errors?.guest2name?.message}</p>
              </FormGroup>
              <FormGroup
                controlId="formBasicEmail"
                className="marging-bottom-wrapper show-calendar"
              >
                <Label>
                  {t("dob")} <span>({t("optional")})</span>
                </Label>
                <Input
                  type="text"
                  placeholder="1990-12-10"
                  value={date2 ? moment(date2).format("yyyy-MM-DD") : ""}
                  onClick={() => setIsCalendarVisible2(true)}
                  disabled={stopEdit2DOB ? true : false}
                />
                <div className="calendar-wrapper-div" ref={calendarRef2}>
                  {isCalendarVisible2 && (
                    <Controller
                      name="guest2dob"
                      control={control}
                      render={({ field }) => (
                        <Calendar
                          dateFormat="YYYY-MM-DD"
                          // {...field}
                          value={field?.value && field?.value}
                          // minDate={new Date()}
                          maxDate={new Date()}
                          onChange={(e) => {
                            field.onChange(e);
                            setDate2(e);
                            setIsCalendarVisible2(false);
                          }}
                        />
                      )}
                    />
                  )}
                </div>
              </FormGroup>
              <FormGroup className="formBasicEmail">
                <Label>Special Requests:</Label>
                <Input
                  type="text"
                  placeholder="Allergy with palm oil. nuts oil"
                  className=""
                  as="textarea"
                  rows={5}
                  {...register("noteGuest2")}
                />
                <p className="text-danger mt-1">{errors?.noteGuest2?.message}</p>
              </FormGroup>
            </div>
          )}
          {schedulerResponse?.guest > 2 && (
            <div className="yourself-guest-detail">
              <h6>{t("guest")} # 3:</h6>
              <FormGroup controlId="formBasicEmail" className="marging-bottom-wrapper">
                <Label>{t("phone")} #</Label>
                <PhoneInput
                  placeholder={"01-000-0000"}
                  specialLabel={"phonenumber"}
                  name="guest3phoneNumber"
                  country={"us"}
                  className="phone-number-input-wrapper"
                  value={defaultValues?.guest3phoneNumber.toString()}
                  onChange={(phone, data, event, formattedValue, handleChange) => {
                    let countryCode = formattedValue.split(" ")[0];
                    let filedValue = formattedValue
                      ?.slice(countryCode.length + 1)
                      ?.replace(/[- )(]/g, "");
                    setguest3PhNo({ countryCode: data?.dialCode, number: filedValue });
                    if (data?.dialCode && filedValue.toString().length === 10) {
                      CheckPhone(data?.dialCode, filedValue, 3);
                    }
                    setValue("guest3phoneNumber", formattedValue);
                    if (
                      !(
                        data?.format?.replace(/[- )(]/g, "").length - countryCode.length ==
                        filedValue.length
                      )
                    ) {
                      setError("guest3phoneNumber", {
                        message: "Please enter valid phone number.",
                      });
                    } else {
                      clearErrors("guest3phoneNumber");
                    }
                  }}
                />
                <p className="text-danger phone_input mt-1">{errors?.guest3phoneNumber?.message}</p>
              </FormGroup>
              <FormGroup controlId="formBasicEmail" className="marging-bottom-wrapper">
                <Label>{t("name")}</Label>
                <Input
                  type="type"
                  placeholder="Mark Anthony"
                  {...register("guest3name")}
                  disabled={stopEdit3Name ? true : false}
                />
                <p className="text-danger phone_input mt-1">{errors?.guest3name?.message}</p>
              </FormGroup>
              <FormGroup
                controlId="formBasicEmail"
                className="marging-bottom-wrapper show-calendar"
              >
                <Label>
                  {t("dob")} <span>({t("optional")})</span>
                </Label>
                <Input
                  type="text"
                  placeholder="1990-12-10"
                  value={date3 ? moment(date3).format("yyyy-MM-DD") : ""}
                  onClick={() => setIsCalendarVisible3(true)}
                  disabled={stopEdit3DOB ? true : false}
                />
                <div className="calendar-wrapper-div" ref={calendarRef3}>
                  {isCalendarVisible3 && (
                    <Controller
                      name="guest3dob"
                      control={control}
                      render={({ field }) => (
                        <Calendar
                          dateFormat="YYYY-MM-DD"
                          // {...field}
                          value={field?.value && field?.value}
                          // minDate={new Date()}
                          maxDate={new Date()}
                          onChange={(e) => {
                            field.onChange(e);
                            setDate3(e);
                            setIsCalendarVisible3(false);
                          }}
                        />
                      )}
                    />
                  )}
                </div>
              </FormGroup>
              <FormGroup className="formBasicEmail">
                <Label>Special Requests:</Label>
                <Input
                  type="text"
                  placeholder="Allergy with palm oil. nuts oil"
                  className=""
                  as="textarea"
                  rows={5}
                  {...register("noteGuest3")}
                />
                <p className="text-danger mt-1">{errors?.noteGuest3?.message}</p>
              </FormGroup>
            </div>
          )}
          {schedulerResponse?.guest > 3 && (
            <div className="yourself-guest-detail">
              <h6>{t("guest")} # 4:</h6>
              <FormGroup controlId="formBasicEmail" className="marging-bottom-wrapper">
                <Label>{t("phone")} #</Label>
                <PhoneInput
                  placeholder={"01-000-0000"}
                  specialLabel={"phonenumber"}
                  name="guest4phoneNumber"
                  country={"us"}
                  className="phone-number-input-wrapper"
                  value={defaultValues?.guest4phoneNumber.toString()}
                  onChange={(phone, data, event, formattedValue, handleChange) => {
                    let countryCode = formattedValue.split(" ")[0];
                    let filedValue = formattedValue
                      ?.slice(countryCode.length + 1)
                      ?.replace(/[- )(]/g, "");
                    setguest4PhNo({ countryCode: data?.dialCode, number: filedValue });
                    if (data?.dialCode && filedValue.toString().length === 10) {
                      CheckPhone(data?.dialCode, filedValue, 4);
                    }
                    setValue("guest4phoneNumber", formattedValue);
                    if (
                      !(
                        data?.format?.replace(/[- )(]/g, "").length - countryCode.length ==
                        filedValue.length
                      )
                    ) {
                      setError("guest4phoneNumber", {
                        message: "Please enter valid phone number.",
                      });
                    } else {
                      clearErrors("guest4phoneNumber");
                    }
                  }}
                />
                <p className="text-danger phone_input mt-1">{errors?.guest4phoneNumber?.message}</p>
              </FormGroup>
              <FormGroup controlId="formBasicEmail" className="marging-bottom-wrapper">
                <Label>{t("name")}</Label>
                <Input
                  type="type"
                  placeholder="Mark anthony"
                  {...register("guest4name")}
                  disabled={stopEdit4Name ? true : false}
                />
                <p className="text-danger phone_input mt-1">{errors?.guest4name?.message}</p>
              </FormGroup>
              <FormGroup
                controlId="formBasicEmail"
                className="marging-bottom-wrapper show-calendar"
              >
                <Label>
                  {t("dob")} <span>({t("optional")})</span>
                </Label>
                <Input
                  type="text"
                  placeholder="1990-12-10"
                  value={date4 ? moment(date4).format("yyyy-MM-DD") : ""}
                  onClick={() => setIsCalendarVisible4(true)}
                  disabled={stopEdit4DOB ? true : false}
                />
                <div className="calendar-wrapper-div" ref={calendarRef4}>
                  {isCalendarVisible4 && (
                    <Controller
                      name="guest4dob"
                      control={control}
                      render={({ field }) => (
                        <Calendar
                          dateFormat="YYYY-MM-DD"
                          // {...field}
                          value={field?.value && field?.value}
                          maxDate={new Date()}
                          onChange={(e) => {
                             const formattedDate = moment(e).format("YYYY-MM-DD"); // Proper format
                            field.onChange(formattedDate);
                            setDate(formattedDate);
                            setIsCalendarVisible(false);
                          }}
                        />
                      )}
                    />
                  )}
                </div>
              </FormGroup>
              <FormGroup className="formBasicEmail">
                <Label>Special Requests:</Label>
                <Input
                  type="text"
                  placeholder="Allergy with palm oil. nuts oil"
                  className=""
                  as="textarea"
                  rows={5}
                  {...register("noteGuest4")}
                />
                <p className="text-danger mt-1">{errors?.noteGuest4?.message}</p>
              </FormGroup>
            </div>
          )} */}
          <FormGroup controlId="formBasicEmail">
            <div className="checkbox-wrapperv5 checkbox-border-div">
              <input
                type="checkbox"
                id="listInfo"
                name="listInfo"
                {...register("listInfo")}
                className="form-check-input"
                // onChange={(e) => handleCheckAddTip(e)}
              />
              <p className="checkbox-wrapperv5-text">
                I agree to receive OTP on the provided contact number.
              </p>
            </div>
            <p className="text-danger mt-1">{errors?.listInfo?.message}</p>
          </FormGroup>
          <div className="footer-btns-wrapper-new-flow booking-step-btn-div">
            <LoadingButton
              type="submit"
              disabled={loading}
              label={"Continue"}
              loadinglabel={"Continue"}
              isLoading={loading}
              className="loading-btn-wrapper"
            />
            <Button type="reset" isBorderBtn={true} onClick={() => goBack()} className="go-back-btn">
              Go Back
            </Button>
          </div>
        </Form>
        <p className="appointment-para-text">This data will only be used for this appointment request. We will not share this with third-party sites.</p>
      </SchedulerModalLayoutWrapper>
    </>
  );
};

export default memo(userInfo);
