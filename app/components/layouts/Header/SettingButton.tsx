"use client";

import React, {
  AllHTMLAttributes,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import users from "@libs/users";
import { useRecoilState } from "recoil";
import { screenModeActions, screenModeState } from "@atoms/screenModeState";
import cookies from "@libs/cookies";
import SettingButtonView, { SettingButtonViewProps } from "./SettingButtonView";
import useClickOutside from "@hooks/useClickOutside";

interface Props extends AllHTMLAttributes<HTMLDivElement> {
  setShowLoginModal: (value: boolean) => void;
}

const SettingButton = React.memo(function SettingButton({
  setShowLoginModal,
  ...props
}: Props) {
  // refs
  const modalRef = useRef<HTMLDivElement>(null);

  // states
  const [showModal, setShowModal] = useState(false);

  // recoil states
  const [screenMode, setScreenMode] = useRecoilState(screenModeState);

  // event handlers
  const handleClickOutside = useCallback(() => {
    if (!showModal) return;
    setShowModal(false);
  }, [showModal]);

  // effects
  useClickOutside(modalRef, handleClickOutside);

  // props
  const settingButtonViewProps = useMemo<SettingButtonViewProps>(
    () => ({
      isLoggedIn: users.isLoggedIn(),
      showModal,
      handleClickSetting: () => setShowModal((prev) => !prev),
      handleClickLogin: () => {
        setShowLoginModal(true);
        setShowModal(false);
      },
      handleClickLogout: () => {
        const ok = confirm("Are you sure to logout?");
        if (ok) {
          users.logout();
          setShowModal(false);
        }
      },
      handleToggleScreenMode: () => {
        setScreenMode(screenModeActions.toggle);
        cookies.set("screenMode", screenModeActions.toggle(screenMode), 30);
      },
    }),
    [showModal, screenMode, setShowLoginModal, setScreenMode],
  );

  return (
    <SettingButtonView {...settingButtonViewProps} ref={modalRef} {...props} />
    // <div className={styles.wrapper} {...props}>
    //   <TransparentButton
    //     aria-label="setting"
    //     className={styles.button}
    //     onClick={() => setShowModal((prev) => !prev)}
    //   >
    //     <SettingSvg aria-hidden width="26" className={styles.settingSvg} />
    //   </TransparentButton>
    //   {showModal ? (
    //     <div ref={modalRef} className={styles.modal}>
    //       <Box>
    //         <TransparentButton
    //           onClick={() => {
    //             setScreenMode(screenModeActions.toggle);
    //             cookies.set(
    //               "screenMode",
    //               screenModeActions.toggle(screenMode),
    //               30,
    //             );
    //           }}
    //         >
    //           <h4>light/dark</h4>
    //         </TransparentButton>
    //         {users.isLoggedIn() ? (
    //           <TransparentButton
    //             className={styles.modalButton}
    //             onClick={() => {
    //               const ok = confirm("Are you sure to logout?");
    //               if (ok) {
    //                 users.logout();
    //                 setShowModal(false);
    //               }
    //             }}
    //           >
    //             <h4>logout</h4>
    //           </TransparentButton>
    //         ) : (
    //           <TransparentButton
    //             className={styles.modalButton}
    //             onClick={() => {
    //               setShowLoginModal(true);
    //               setShowModal(false);
    //             }}
    //           >
    //             <h4>login</h4>
    //           </TransparentButton>
    //         )}
    //       </Box>
    //     </div>
    //   ) : null}
    // </div>
  );
});

export default SettingButton;

// before refactoring
// const SettingModal = React.forwardRef(function SettingModal({...props}: AllHTMLAttributes<HTMLDivElement>, ref: React.Ref<HTMLDivElement>) {
//   const [screenMode, setScreenMode] = useRecoilState(screenModeState);
//   return <div {...props}  className={styles.modal} ref={ref}>
//     <Box>
//             <TransparentButton
//               onClick={() => {
//                 setScreenMode(screenModeActions.toggle);
//                 cookies.set(
//                   "screenMode",
//                   screenModeActions.toggle(screenMode),
//                   30,
//                 );
//               }}
//             >
//               <h4>light/dark</h4>
//             </TransparentButton>
//             {users.isLoggedIn() ? (
//               <TransparentButton
//                 className={styles.modalButton}
//                 onClick={() => {
//                   const ok = confirm("Are you sure to logout?");
//                   if (ok) {
//                     users.logout();
//                     setShowModal(false);
//                   }
//                 }}
//               >
//                 <h4>logout</h4>
//               </TransparentButton>
//             ) : (
//               <TransparentButton
//                 className={styles.modalButton}
//                 onClick={() => {
//                   setShowLoginModal(true);
//                   setShowModal(false);
//                 }}
//               >
//                 <h4>login</h4>
//               </TransparentButton>
//             )}
//           </Box>
//   </div>
// })