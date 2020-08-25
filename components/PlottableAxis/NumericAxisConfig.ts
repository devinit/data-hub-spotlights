import { Axes, Scales } from 'plottable';
import { Numeric } from 'plottable/build/src/axes';
import { Linear } from 'plottable/build/src/scales';
import { AxisOptions } from './types';

class NumericAxisConfig {
  private options: AxisOptions;
  private axis: Numeric;
  private scale: Linear;

  constructor(options: AxisOptions) {
    this.options = options;
    this.scale = this.createScale(this.options);
    this.axis = this.createAxis(this.options, this.scale);
  }

  setOptions(options: AxisOptions) {
    this.options = options;
  }

  getOptions() {
    return this.options;
  }

  getAxis() {
    return this.axis;
  }

  getScale() {
    return this.scale;
  }

  /**
   * only use when the axis has been rendered to the DOM
   */
  getTickMarks() {
    return this.axis.content().selectAll('.tick-mark');
  }

  /**
   * only use when the axis has been rendered to the DOM
   */
  getTickLabels() {
    return this.axis.content().selectAll('.tick-label');
  }

  private createAxis(options: AxisOptions, scale: Linear) {
    const axis = new Axes.Numeric(scale, options.orientation || 'bottom');
    axis.yAlignment(options.yAlignment || 'center').showEndTickLabels(options.showEndTickLabels || false);
    if (options.prefix || options.suffix) {
      axis.formatter((data) => `${options.prefix || ''}${data}${options.suffix || ''}`);
    }

    return axis;
  }

  private createScale(options: AxisOptions) {
    const scale = new Scales.Linear();
    scale.domain(options.domain);
    if (options.tickInterval) {
      const tickGenerator = Scales.TickGenerators.intervalTickGenerator(options.tickInterval);
      scale.tickGenerator(tickGenerator);
    } else if (options.data) {
      scale.tickGenerator(() => (options.data as number[]).sort((a, b) => a - b));
    }

    return scale;
  }
}

export { NumericAxisConfig };
