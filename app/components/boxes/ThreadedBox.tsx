import { DefaultBoxProps } from ".";
import styles from "./threadedBox.module.scss";

interface ThreadedBoxProps extends DefaultBoxProps {}

export default function ThreadedBox({ children }: ThreadedBoxProps) {
  return <div className={styles.box}>{children}</div>;
}
