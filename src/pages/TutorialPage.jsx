import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";

const TutorialPage = () => {
  const { user } = useAuth();

  
  return (
    <>
      {user ? (
        <div className="md:grid flex grid-cols-3 gap-5 py-[80px] w-full">
          <SideBar user={user} />

          <div className="col-span-2 p-2 w-full">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col justify-center items-center gap-5 text-right container max-w-[600px] mx-auto">
                <h2 className="text-xl font-semibold">ڕێنمایەکان</h2>

                <p>
                  گرینگە پێش داوا کردنی هەر داواکاریەک ئەم خالانە جێ بەجێ بکەیت
                </p>

                <p>
                  ١- پێش ئەوەی داواکاریەکە ئەنجام بدەی دلنیاببەوە چونکە
                  هەلوەشاندنەوەی داواکاری نییە
                </p>

                <p>
                  ٢- پێش ئەوەی داواکاری دوەم بنێری بۆ هەمان هەژمار بوەستە تا
                  داواکاری یەکەم کۆتای پێ دێت ئەوکات داوا کاری دوەم بکە بۆ هەمان
                  هەژمار
                </p>

                <p>
                  ٣- هەمو داواکاریەکان لە ماوەی ٢٤ کاژتژمێردا تەواودەبن پێویست
                  ناکات ئادمین بێزار بکەیت لە کاتی دوا کەوتن
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default TutorialPage;
