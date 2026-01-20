'use client';

import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { useState, useEffect } from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';

interface DateRangePickerProps {
    fromDate: string;
    toDate: string;
    onDateChange: (from: string, to: string) => void;
}

export default function DateRangePicker({
    fromDate,
    toDate,
    onDateChange,
}: DateRangePickerProps) {
    const [date, setDate] = useState<DateRange | undefined>();

    // Sync internal state with props, BUT allow for empty state
    // We only set the internal state if both dates are present and valid
    // This prevents the calendar from breaking or showing erratic behavior
    useEffect(() => {
        if (fromDate && toDate) {
            const from = new Date(fromDate);
            const to = new Date(toDate);
            // Basic validity check
            if (!isNaN(from.getTime()) && !isNaN(to.getTime())) {
                setDate({
                    from: from,
                    to: to,
                });
            }
        } else if (!fromDate && !toDate) {
            setDate(undefined)
        }
    }, [fromDate, toDate]);

    // Handle calendar selection
    const handleSelect = (range: DateRange | undefined) => {
        setDate(range);

        if (range?.from && range?.to) {
            // Only trigger change when both dates are selected
            onDateChange(
                format(range.from, 'yyyy-MM-dd'),
                format(range.to, 'yyyy-MM-dd')
            );
        } else if (range === undefined) {
            // Handle clear
            onDateChange('', '');
        }
    };

    const clearFilters = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent popover toggle
        setDate(undefined);
        onDateChange('', '');
    }

    return (
        <div className={cn('grid gap-2')}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={'outline'}
                        className={cn(
                            'w-[300px] justify-start text-left font-normal bg-white/5 border-white/10 hover:bg-white/10 text-white',
                            !date && 'text-muted-foreground'
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4 text-purple-400" />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, 'LLL dd, y')} -{' '}
                                    {format(date.to, 'LLL dd, y')}
                                </>
                            ) : (
                                format(date.from, 'LLL dd, y')
                            )
                        ) : (
                            <span>Pick a date range</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-gray-950 border-white/10" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={handleSelect}
                        numberOfMonths={2}
                        className="text-white"
                    />
                    <div className="p-3 border-t border-white/10 flex justify-end">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={clearFilters}
                            className="text-gray-400 hover:text-white hover:bg-white/10"
                        >
                            Clear
                        </Button>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
}
