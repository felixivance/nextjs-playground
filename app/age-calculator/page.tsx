'use client';

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import React, { useState } from 'react'
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'

type Props = {}

type AgeResult = {
  years: number
  months: number
  days: number
}
const AgeCalculator = (props: Props) => {

  const [birthDate, setBirthDate] = useState<Date>()
  const [age, setAge] = useState<AgeResult | null>(null)
  const today = new Date()
  const {width, height} = useWindowSize()
  const [isBirthDayToday, setIsBirthDayToday] = useState(false)

  const handleDateSelect = (date: Date | undefined) => {
    setBirthDate(date)
    if(date){
      const today = new Date();

      let years = today.getFullYear() - date.getFullYear();
      let months = today.getMonth() - date.getMonth();
      let days = today.getDate() - date.getDate();

      // adjust for negative months or days
      if(days < 0){
        months --;
        const lastMonth = new Date(today.getFullYear(), today.getMonth() -1 ,date.getDate());
        days += Math.floor((today.getTime() - lastMonth.getTime()) / (1000 * 60 * 60 * 24));
      }

      if(months < 0){
        years --;
        months += 12;
      }
      const age = {years, months, days}

      setAge(age)
      if(date.getDate() === today.getDate() && date.getMonth() === today.getMonth()){
        setIsBirthDayToday(true)
      }else{
        setIsBirthDayToday(false)
      }
    }else{
      setAge(null)
    }
  }

  const formatDate=(date:Date)=>{
    return date.toLocaleDateString('en-US',{
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className='flex items-center justify-center p-4  bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen'>
      {isBirthDayToday && <Confetti width={width} height={height} />}
      <Card className='w-full max-w-xl'>
        <CardHeader>
        <CardTitle className='text-2xl text-center font-bold'>
          {
            isBirthDayToday ? 'Happy Birthday To You!' : 'Age Calculator'
          }
          </CardTitle>
        <CardDescription className='text-center'>
          <span className='block text-lg font-medium text-primary mt-2'>
          Today is {formatDate(today)}
          </span>
        </CardDescription>
        </CardHeader>
        <CardContent className='space-y-6'>
          <div className='flex flex-col items-center space-y-4'>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant={'outline'}
                className={`w-[280px] justify-start text-left font-normal
                ${!birthDate && 'text-muted-foreground'}`}>
                  Select your birth date
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-popover" align="start">
                <Calendar
                  mode="single"
                  selected={birthDate}
                  onSelect={handleDateSelect}
                  disabled={(date) =>
                    date > today || date < new Date('1900-01-01')
                  }
                  initialFocus
                  captionLayout="dropdown"
                  fromYear={1900}
                  toYear={today.getFullYear()}
                />
              </PopoverContent>
            </Popover>
          </div>

          {
            age && (
              <div className='mt-6'>
                <div className='grid grid-cols-3 gap-4 text-center'>
                  <div className='space-y-2'>
                    <div className='text-4xl font-bold text-primary'>{age.years}</div>
                    <div className='text-sm text-muted-foreground'>Years</div>
                  </div>
                  <div className='space-y-2'>
                    <div className='text-4xl font-bold text-primary'>{age.months}</div>
                    <div className='text-sm text-muted-foreground'>Months</div>
                  </div>
                  <div className='space-y-2'>
                    <div className='text-4xl font-bold text-primary'>{age.days}</div>
                    <div className='text-sm text-muted-foreground'>Days</div>
                  </div>
                </div>
                { 
                  birthDate && (
                    <div className='text-center text-muted-foreground mt-4 text-sm'>
                      You were born on {formatDate(birthDate)}
                      
                    </div>
                  )
                }
                {
                  isBirthDayToday && (
                    <div className='text-center text-primary mt-4 text-lg font-bold'>
                      { ` 🎉🎉🎉 And Today is your birthday! 🎉🎉🎉`}
                    </div>
                    
                  )
                }
              </div>

             
            )
          }
        </CardContent>
      </Card>
    </div>
  )
}

export default AgeCalculator