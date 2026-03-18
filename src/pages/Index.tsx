import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function HelloWorld() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-lg border-primary/20">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Hello World</CardTitle>
          <CardDescription>欢迎来到由 Vesa 构建的现代化 Web 应用</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button onClick={() => alert("你好！这是来自 Vesa 的问候。")}>
            点击互动
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
