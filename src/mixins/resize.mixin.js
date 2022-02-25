import _ from 'lodash';

export default {
  data: () => ({
    containerWidth: 300,
    containerHeight: 560,
    innerHeight: null,
    innerWidth: null,
    startResizeX: null,
    startResizeY: null,
    startResizeWidth: null,
    startResizeHeight: null,
    resizeHash: null,
    onInputFocus: false,
  }),

  watch: {
    innerHeight: 'resizeContainer',
    innerWidth: 'resizeContainer',
  },

  computed: {
    isDesktop: ths => ths.innerWidth >= 768,
    appWidth: ths => ths.isDesktop ? ths.containerWidth : ths.innerWidth,
    appHeight: ths => ths.isDesktop ? ths.containerHeight : ths.innerHeight,
  },

  methods: {
    resizeContainer(sizes = {}) {
      const containerWidth = sizes.containerWidth || this.containerWidth;
      const containerHeight = sizes.containerHeight || this.containerHeight;
      this.containerWidth = _.clamp(containerWidth, 300, this.innerWidth - 150);
      this.containerHeight = _.clamp(containerHeight, 560, this.innerHeight - 100);
    },

    setContainerSize({ pageX, pageY }) {
      requestAnimationFrame(() => {
        if(_.isNull(this.startResizeX) || _.isNull(this.startResizeWidth)) return;
        if(_.isNull(this.startResizeY) || _.isNull(this.startResizeHeight)) return;
        const containerWidth = (pageX - this.startResizeX) * 2 + this.startResizeWidth;
        const containerHeight = (pageY - this.startResizeY) * 2 + this.startResizeHeight;
        this.resizeContainer({ containerWidth, containerHeight });
      })
    },

    startResize(event) {
      this.startResizeX = event.pageX;
      this.startResizeY = event.pageY;
      this.startResizeWidth = this.containerWidth;
      this.startResizeHeight = this.containerHeight;
      document.addEventListener('mousemove', this.setContainerSize);
      document.addEventListener('mouseup', this.stopResize);
      window.addEventListener('mouseleave', this.stopResize);
    },

    stopResize() {
      this.startResizeX = null;
      this.startResizeY = null;
      this.startResizeWidth = null;
      this.startResizeHeight = null;
      document.removeEventListener('mousemove', this.setContainerSize);
      document.removeEventListener('mouseup', this.stopResize);
      window.removeEventListener('mouseleave', this.stopResize);
    },
  },

  beforeMount() {
    const updateInnerSize = () => {
      this.innerWidth = document.body.offsetWidth;
      if(this.onInputFocus) return;
      this.innerHeight = innerHeight;
    }

    updateInnerSize();
    window.addEventListener('resize', updateInnerSize);
    setInterval(updateInnerSize, 1000);
  },
};
