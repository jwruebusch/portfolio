import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, ViewChild } from '@angular/core';

interface RippleCenter {
  x: number;
  y: number;
  frequency: number;
  amplitude: number;
  startTime: number;
  duration: number;
  phase: number;
  isClickRipple?: boolean;
}

@Component({
  selector: 'app-background',
  standalone: true,
  imports: [],
  templateUrl: './background.component.html',
  styleUrl: './background.component.scss'
})
export class BackgroundComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: true }) private canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private animationFrameId = 0;
  private time = 0;
  private ripples: RippleCenter[] = [];

  private readonly WAVE_CONFIG = {
    PIXEL_SIZE: 25,
    WAVE_SPEED: 6,
    WAVE_WIDTH: 6,
    ANIMATION_SPEED: 0.015,
    DECAY_RATE: 0.018,
    MIN_INTENSITY_THRESHOLD: 0.08,
    RIPPLE_COUNT: 6,
    MAX_CLICK_RIPPLES: 8,
  } as const;

  private readonly RIPPLE_CONFIG = {
    MIN_FREQUENCY: 0.02,
    MAX_FREQUENCY: 0.04,
    MIN_AMPLITUDE: 0.6,
    MAX_AMPLITUDE: 2.0,
    MIN_DURATION: 20,
    MAX_DURATION: 35,
    STAGGER_INTERVAL: 4,
    RESTART_DELAY: 6,
    CLICK_AMPLITUDE: 1.2,
    CLICK_DURATION: 15,
    CLICK_FREQUENCY: 0.03,
  } as const;

  private readonly COLORS = {
    BACKGROUND: '#000000',
    DARK_PIXEL: '#000033',
    MAX_BLUE: 160,
    BASE_BLUE: 40,
    MAX_GREEN: 70,
    GREEN_MULTIPLIER: 50,
    CLICK_MAX_BLUE: 180,
    CLICK_BASE_BLUE: 60,
    CLICK_MAX_GREEN: 90,
  } as const;

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    const context = canvas.getContext('2d');
    if (!context) {
      throw new Error('Failed to get 2D context');
    }

    this.ctx = context;
    this.setupCanvas();
    this.ripples = this.initializeRipples();

    document.addEventListener('click', this.handleDocumentInteraction);
    document.addEventListener('touchstart', this.handleDocumentInteraction, { passive: true });

    this.animate();
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.setupCanvas.bind(this));
    document.removeEventListener('click', this.handleDocumentInteraction);
    document.removeEventListener('touchstart', this.handleDocumentInteraction);
    cancelAnimationFrame(this.animationFrameId);
  }

  @HostListener('window:resize')
  onResize(): void {
    this.setupCanvas();
  }

  private setupCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  private initializeRipples(): RippleCenter[] {
    return Array.from({ length: this.WAVE_CONFIG.RIPPLE_COUNT }, (_, i) => {
      const ripple = this.createRippleCenter();
      ripple.startTime = this.time + i * this.RIPPLE_CONFIG.STAGGER_INTERVAL;
      return ripple;
    });
  }

  private createRippleCenter(isClick = false): RippleCenter {
    const { PIXEL_SIZE } = this.WAVE_CONFIG;
    const canvas = this.canvasRef.nativeElement;
    const sizeX = Math.ceil(canvas.width / PIXEL_SIZE);
    const sizeY = Math.ceil(canvas.height / PIXEL_SIZE);
    return {
      x: Math.random() * sizeX,
      y: Math.random() * sizeY,
      frequency: isClick
          ? this.RIPPLE_CONFIG.CLICK_FREQUENCY
          : this.RIPPLE_CONFIG.MIN_FREQUENCY + Math.random() * (this.RIPPLE_CONFIG.MAX_FREQUENCY - this.RIPPLE_CONFIG.MIN_FREQUENCY),
      amplitude: isClick
          ? this.RIPPLE_CONFIG.CLICK_AMPLITUDE
          : this.RIPPLE_CONFIG.MIN_AMPLITUDE + Math.random() * (this.RIPPLE_CONFIG.MAX_AMPLITUDE - this.RIPPLE_CONFIG.MIN_AMPLITUDE),
      startTime: this.time,
      duration: isClick
          ? this.RIPPLE_CONFIG.CLICK_DURATION
          : this.RIPPLE_CONFIG.MIN_DURATION + Math.random() * (this.RIPPLE_CONFIG.MAX_DURATION - this.RIPPLE_CONFIG.MIN_DURATION),
      phase: isClick ? 0 : Math.random() * Math.PI * 2,
      isClickRipple: isClick,
    };
  }

  private createClickRipple(x: number, y: number): RippleCenter {
    const { PIXEL_SIZE } = this.WAVE_CONFIG;
    return this.createRippleCenter(true) as RippleCenter & { x: number; y: number };
  }

  private handleDocumentInteraction = (event: MouseEvent | TouchEvent): void => {
    if (this.shouldIgnoreClick(event.target)) {
      return;
    }

    let clientX: number;
    let clientY: number;
    if (event instanceof MouseEvent) {
      clientX = event.clientX;
      clientY = event.clientY;
    } else {
      const touch = event.touches[0] || event.changedTouches[0];
      if (!touch) {
        return;
      }
      clientX = touch.clientX;
      clientY = touch.clientY;
    }

    const ripple = this.createRippleCenter(true);
    ripple.x = clientX / this.WAVE_CONFIG.PIXEL_SIZE;
    ripple.y = clientY / this.WAVE_CONFIG.PIXEL_SIZE;
    this.ripples.push(ripple);
  };

  private shouldIgnoreClick(target: EventTarget | null): boolean {
    if (!(target instanceof Element)) {
      return false;
    }

    const selectors = [
      'button', 'a', 'input', 'textarea', 'select',
      '[role="button"]', '[tabindex]',
      '.pointer-events-auto button',
      '.pointer-events-auto a',
      '.pointer-events-auto input',
      '.pointer-events-auto textarea'
    ];

    let el: Element | null = target;
    while (el) {
      for (const sel of selectors) {
        if (el.matches(sel)) {
          return true;
        }
      }
      el = el.parentElement;
    }

    return false;
  }

  private animate = (): void => {
    this.time += this.WAVE_CONFIG.ANIMATION_SPEED;
    this.updateRipples();
    this.renderWaves();
    this.renderScanlines();
    this.animationFrameId = requestAnimationFrame(this.animate);
  };

  private updateRipples(): void {
    const updated: RippleCenter[] = [];

    for (const c of this.ripples) {
      if (this.time - c.startTime <= c.duration) {
        updated.push(c);
      } else if (!c.isClickRipple) {
        const restart = this.createRippleCenter();
        restart.startTime = this.time + Math.random() * this.RIPPLE_CONFIG.RESTART_DELAY;
        updated.push(restart);
      }
    }

    const clicks = updated.filter(r => r.isClickRipple);
    if (clicks.length > this.WAVE_CONFIG.MAX_CLICK_RIPPLES) {
      let excess = clicks.length - this.WAVE_CONFIG.MAX_CLICK_RIPPLES;
      for (let i = 0; i < updated.length && excess > 0; i++) {
        if (updated[i].isClickRipple) {
          updated.splice(i, 1);
          i--;
          excess--;
        }
      }
    }

    this.ripples = updated;
  }

  private renderWaves(): void {
    const canvas = this.canvasRef.nativeElement;
    const { PIXEL_SIZE, MIN_INTENSITY_THRESHOLD } = this.WAVE_CONFIG;
    const cols = Math.ceil(canvas.width / PIXEL_SIZE);
    const rows = Math.ceil(canvas.height / PIXEL_SIZE);

    this.ctx.fillStyle = this.COLORS.BACKGROUND;
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const intensity = this.calculateTotalIntensity(i, j);
        const click = this.ripples.some(r => r.isClickRipple && this.calculateWaveIntensity(i, j, r) > MIN_INTENSITY_THRESHOLD);
        this.ctx.fillStyle = this.intensityToColor(intensity, click);
        this.ctx.fillRect(i * PIXEL_SIZE, j * PIXEL_SIZE, PIXEL_SIZE - 1, PIXEL_SIZE - 1);
      }
    }
  }

  private renderScanlines(): void {
    const canvas = this.canvasRef.nativeElement;
    const { PIXEL_SIZE } = this.WAVE_CONFIG;
    const rows = Math.ceil(canvas.height / PIXEL_SIZE);

    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    for (let j = 0; j < rows; j += 2) {
      this.ctx.fillRect(0, j * PIXEL_SIZE, canvas.width, PIXEL_SIZE / 2);
    }
  }

  private calculateTotalIntensity(x: number, y: number): number {
    return this.ripples.reduce((sum, c) => sum + Math.max(0, this.calculateWaveIntensity(x, y, c)), 0);
  }

  private calculateWaveIntensity(px: number, py: number, c: RippleCenter): number {
    const dx = px - c.x;
    const dy = py - c.y;
    const dist = Math.hypot(dx, dy);
    const t = this.time - c.startTime;
    if (t <= 0) {
      return 0;
    }

    const waveFront = t * this.WAVE_CONFIG.WAVE_SPEED;
    const ringDist = Math.abs(dist - waveFront);
    if (ringDist > this.WAVE_CONFIG.WAVE_WIDTH) {
      return 0;
    }

    const decay = Math.max(0, 1 - dist * this.WAVE_CONFIG.DECAY_RATE);
    const intensity = (1 - ringDist / this.WAVE_CONFIG.WAVE_WIDTH) * decay;
    const pulse = 0.8 + 0.2 * Math.sin(c.phase + t * c.frequency);
    return intensity * c.amplitude * pulse;
  }

  private intensityToColor(intensity: number, click: boolean): string {
    if (intensity <= this.WAVE_CONFIG.MIN_INTENSITY_THRESHOLD) {
      return this.COLORS.DARK_PIXEL;
    }

    const maxBlue = click ? this.COLORS.CLICK_MAX_BLUE : this.COLORS.MAX_BLUE;
    const baseBlue = click ? this.COLORS.CLICK_BASE_BLUE : this.COLORS.BASE_BLUE;
    const maxGreen = click ? this.COLORS.CLICK_MAX_GREEN : this.COLORS.MAX_GREEN;
    const blue = Math.min(255, Math.floor(intensity * maxBlue) + baseBlue);
    const green = Math.min(maxGreen, Math.floor(intensity * this.COLORS.GREEN_MULTIPLIER));

    return `rgb(0, ${green}, ${blue})`;
  }
}
