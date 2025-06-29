import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { HobbyInfo } from "./types"

interface HobbyFilterProps {
  selectedCategory: string
  setSelectedCategory: (value: string) => void
  hobbies: HobbyInfo[]
}

export default function HobbyFilter({ selectedCategory, setSelectedCategory, hobbies }: HobbyFilterProps) {
  return (
    <div className="mb-8">
      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
        <SelectTrigger className="w-48 bg-blue-50 border-blue-200">
          <SelectValue placeholder='Сонирхол сонгох' />
        </SelectTrigger>
        <SelectContent>
          {hobbies.map(hobby => (
            <SelectItem value={hobby.title} key={hobby._id}>{hobby.title}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
} 