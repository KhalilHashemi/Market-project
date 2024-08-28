import styles from "./Loader.module.css";

function Loader() {
  return (
    <div className="mt-40 text-center">
      <span className={`${styles.loader} w-12 h-12 m-auto inline-block`}></span>
      <div className="mt-2">در حال بارگذاری</div>
    </div>
  );
}

export default Loader;
