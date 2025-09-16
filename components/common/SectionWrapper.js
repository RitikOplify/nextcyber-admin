const SectionWrapper = ({ children, className = "" }) => {
  return (
    <section className={`w-full ${className ? className : "bg-white"}`}>
      {children}
    </section>
  );
};

export default SectionWrapper;
