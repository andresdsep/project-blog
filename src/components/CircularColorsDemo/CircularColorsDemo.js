'use client';
import Card from '@/components/Card';
import VisuallyHidden from '@/components/VisuallyHidden';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Pause, Play, RotateCcw } from 'react-feather';

import styles from './CircularColorsDemo.module.css';

const COLORS = [
  { label: 'red', value: 'hsl(348deg 100% 60%)' },
  { label: 'yellow', value: 'hsl(50deg 100% 55%)' },
  { label: 'blue', value: 'hsl(235deg 100% 65%)' },
];

function CircularColorsDemo() {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // COLORS array:
  const selectedColor = COLORS[timeElapsed % COLORS.length];

  const onPlayPress = () => setIsTimerRunning((curr) => !curr);
  const onResetPress = () => {
    setIsTimerRunning(false);
    setTimeElapsed(0);
  };

  useEffect(() => {
    let timeout;
    const runTimer = () => {
      timeout = setTimeout(() => {
        setTimeElapsed((t) => t + 1);
        runTimer();
      }, 1000);
    };

    if (isTimerRunning) {
      runTimer();
    }

    return () => clearTimeout(timeout);
  }, [isTimerRunning]);

  return (
    <Card as="section" className={styles.wrapper}>
      <ul className={styles.colorsWrapper}>
        {COLORS.map((color, index) => {
          const isSelected = color.value === selectedColor.value;

          return (
            <li className={styles.color} key={index}>
              {isSelected && (
                <motion.div layoutId="selected-frame" className={styles.selectedColorOutline} />
              )}
              <div
                className={clsx(styles.colorBox, isSelected && styles.selectedColorBox)}
                style={{
                  backgroundColor: color.value,
                }}
              >
                <VisuallyHidden>{color.label}</VisuallyHidden>
              </div>
            </li>
          );
        })}
      </ul>

      <div className={styles.timeWrapper}>
        <dl className={styles.timeDisplay}>
          <dt>Time Elapsed</dt>
          <dd>{timeElapsed}</dd>
        </dl>
        <div className={styles.actions}>
          <button onClick={onPlayPress}>
            {isTimerRunning ? <Pause /> : <Play />}
            <VisuallyHidden>Play</VisuallyHidden>
          </button>
          <button onClick={onResetPress}>
            <RotateCcw />
            <VisuallyHidden>Reset</VisuallyHidden>
          </button>
        </div>
      </div>
    </Card>
  );
}

export default CircularColorsDemo;
