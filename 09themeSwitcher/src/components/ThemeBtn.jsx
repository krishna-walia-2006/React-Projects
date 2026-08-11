import useTheme from "../Contexts/Theme";

export default function ThemeBtn() {
  const { themeMode, lightTheme, darkTheme } = useTheme();

  const onChangeBtn = (e) => {
    if (e.currentTarget.checked) {
      darkTheme();
    } else {
      lightTheme();
    }
  };

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={themeMode === "dark"}
        onChange={onChangeBtn}
      />

      <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700
      peer-checked:bg-blue-600
      after:content-[''] after:absolute after:top-0.5 after:left-0.5
      after:bg-white after:border after:rounded-full after:h-5 after:w-5
      after:transition-all peer-checked:after:translate-x-full"></div>

      <span className="ml-3 text-sm font-medium text-gray-900 dark:text-white">
        Toggle Theme
      </span>
    </label>
  );
}