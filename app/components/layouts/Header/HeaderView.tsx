"use client";

import React, { AllHTMLAttributes, ButtonHTMLAttributes } from "react";
import Image from "next/image";
import avatar128 from "@images/avatar128.png";
import HomeSvg from "@components/svgs/HomeSvg";
import WriteSvg from "@components/svgs/WriteSvg";
import UserSvg from "@components/svgs/UserSvg";
import styles from "./headerView.module.scss";

interface HeaderViewProps extends AllHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function HeaderView({ children, ...props }: HeaderViewProps) {
  return (
    <div className={styles.wrapper} {...props}>
      {children}
    </div>
  );
}

interface LogoProps extends AllHTMLAttributes<HTMLDivElement> {
  handleClick: () => void;
}

HeaderView.Logo = React.memo(function Logo({
  handleClick,
  ...props
}: LogoProps) {
  return (
    <div className={styles.logoWrapper} {...props}>
      <Image
        aria-label="home page"
        role="link"
        width="40"
        src={avatar128}
        alt="home"
        onClick={handleClick}
      />
    </div>
  );
});

export interface HeaderViewNavProps extends AllHTMLAttributes<HTMLDivElement> {
  handleClickHome: () => void;
  handleClickWrite: () => void;
  handleClickWille: () => void;
  isHome: boolean;
  isWille: boolean;
}

HeaderView.Nav = React.memo(function Nav({
  handleClickHome,
  handleClickWrite,
  handleClickWille,
  isHome,
  isWille,
  ...props
}: HeaderViewNavProps) {
  return (
    <nav className={styles.nav} {...props}>
      <HomeButton onClick={handleClickHome} isHome={isHome} />
      <WriteButton onClick={handleClickWrite} />
      <WilleButton onClick={handleClickWille} isWille={isWille} />
    </nav>
  );
});

interface HomeButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isHome: boolean;
}

const HomeButton = React.memo(function HomeButton({
  isHome,
  ...props
}: HomeButtonProps) {
  return (
    <button aria-label="home page" className={styles.linkButton} {...props}>
      <HomeSvg
        aria-hidden
        isActive={isHome}
        color={isHome ? "rgb(var(--icon))" : "rgb(var(--icon-faded))"}
      />
    </button>
  );
});

const WriteButton = React.memo(function WriteButton({
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      aria-label="open thread form modal"
      className={styles.linkButton}
      {...props}
    >
      <WriteSvg aria-hidden color="rgb(var(--icon-faded))" />
    </button>
  );
});

interface WilleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isWille: boolean;
}

const WilleButton = React.memo(function WilleButton({
  isWille,
  ...props
}: WilleButtonProps) {
  return (
    <button
      aria-label="wille's resumé"
      className={styles.linkButton}
      {...props}
    >
      <UserSvg
        aria-hidden
        isActive={isWille}
        color={isWille ? "rgb(var(--icon))" : "rgb(var(--icon-faded))"}
      />
    </button>
  );
});

// before refactoring
// export default function HeaderView({ ...props }: HeaderViewProps) {
//   const pathname = usePathname();
//   const router = useRouter();
//   const [showLoginModal, setShowLoginModal] = useState(false);
//   const [showWriteModal, setShowWriteModal] = useState(false);
//   const handleClickWrite = () => {
//     const isLoggedIn = users.isLoggedIn();
//     if (!isLoggedIn) {
//       setShowLoginModal(true);
//     } else {
//       setShowWriteModal(true);
//     }
//   };
//   return (
//     <div className={styles.wrapper} {...props}>
//       {showLoginModal
//         ? createPortal(
//             <LoginModal handleClose={() => setShowLoginModal(false)} />,
//             document.body,
//           )
//         : null}
//       {showWriteModal
//         ? createPortal(
//             <WriteModal handleClose={() => setShowWriteModal(false)} />,
//             document.body,
//           )
//         : null}
//       <div className={styles.logoWrapper}>
//         <Image
//           aria-label="home page"
//           role="link"
//           width="40"
//           src={avatar128}
//           alt="home"
//           onClick={() => router.push("/")}
//         />
//       </div>
//       <nav className={styles.nav}>
//         <button
//           aria-label="home page"
//           className={styles.linkButton}
//           onClick={() => router.push("/")}
//         >
//           <HomeSvg
//             aria-hidden
//             isActive={pathname === "/"}
//             color={
//               pathname === "/" ? "rgb(var(--icon))" : "rgb(var(--icon-faded))"
//             }
//           />
//         </button>
//         <button
//           aria-label="open thread form modal"
//           className={styles.linkButton}
//           onClick={handleClickWrite}
//         >
//           <WriteSvg aria-hidden color="rgb(var(--icon-faded))" />
//         </button>
//         <button
//           aria-label="wille's resumé"
//           className={styles.linkButton}
//           onClick={() => router.push("/wille")}
//         >
//           <UserSvg
//             aria-hidden
//             isActive={pathname === "/wille"}
//             color={
//               pathname === "/wille"
//                 ? "rgb(var(--icon))"
//                 : "rgb(var(--icon-faded))"
//             }
//           />
//         </button>
//       </nav>
//       <SettingButton setShowLoginModal={setShowLoginModal} />
//     </div>
//   );
// }
