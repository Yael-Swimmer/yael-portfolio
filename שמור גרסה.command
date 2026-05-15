#!/bin/bash
cd "/Users/yaelswimmer/Desktop/עיצוב גרפי/Claude code project"

echo ""
echo "💾 שמירת גרסה — אתר פורטפוליו"
echo "--------------------------------"
echo "מה שינית? (לחצי Enter לדלג):"
read msg

if [ -z "$msg" ]; then
  msg="שמירה — $(date '+%d/%m/%Y %H:%M')"
fi

git add .
git commit -m "$msg"

echo ""
echo "✅ הגרסה נשמרה: $msg"
echo ""
echo "לחצי Enter לסגור"
read
