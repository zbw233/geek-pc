import Bar from "@/component/bar";

function Home() {
  return (
    <div>
      <Bar
        style={{ width: "500px", height: "400px" }}
        title="主要框架使用满意度1"
        xData={["react", "anglur", "vue"]}
        yData={[30, 40, 50]}
      />
      <Bar
        style={{ width: "300px", height: "200px" }}
        title="主要框架使用满意度2"
        xData={["react", "anglur", "vue"]}
        yData={[60, 70, 80]}
      />
    </div>
  );
}
export default Home;
