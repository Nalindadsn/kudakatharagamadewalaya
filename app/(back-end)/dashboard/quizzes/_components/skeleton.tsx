import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function SkeletonCardList() {
  return (
    <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-2 ">
      {[...Array(20)].map((p, index) => (
        <Card key={index} className="h-[200px] w-full animate-pulse">
          <CardHeader>
            <div className="h-6 rounded bg-gray-300" />
          </CardHeader>
          <CardContent>
            <div className="h-24 rounded bg-gray-300" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
