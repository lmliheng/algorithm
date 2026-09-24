
主目录文件编译：mvn complie
编译test目录：mvn test-complie

更新mvn依赖：mvn -q dependency:resolve
检查依赖是否成功解析：mvn dependency:resolve


自动运行test目录下文件：mvn test

JVM命令：
执行class(-cp后指定所有class的路径，多个路径用;隔开) :java -cp "target/classes;target/test-classes" com.algorithm.ds_test


要写成JUnit注解的测试方法 (JUnit / TestNG / AssertJ / Mockito)
类名匹配：*Test / *Tests / *TestCase，@Test注解不匹配main
