
describe('Test', function() {


  describe('Advertisement', function() {
    var video, window;
    beforeEach(function() {
      video = {}

      video.offsetLeft = 95
      video.offsetTop = 886
      video.offsetWidth = 696
      video.offsetHeight = 402
      video.start = sinon.spy()
      video.pause = sinon.spy()
     
      window = {}
      window.pageXOffset = 0
      window.innerWidth = 886
      window.pageYOffset = 780
      window.innerHeight = 649
    })
    
    it('checkScroll', function() {   
      var method = sinon.spy(getVisible);

      checkScroll(video)
      expect(method).to.have.been.called
    });

    it('play time 25%', function() {   
      // var storeMock = sinon.mock(getVisible);
      var videoTimeRatio = logVideoTime({duration: 10, currentTime: 2.5})
      expect(videoTimeRatio.toString()).equal('0.25')
    });
    it('play time 50%', function() {   
      // var storeMock = sinon.mock(getVisible);
      var videoTimeRatio = logVideoTime({duration: 10, currentTime: 5})
      expect(videoTimeRatio.toString()).equal('0.50')
    });
    it('play time 75%', function() {   
      // var storeMock = sinon.mock(getVisible);
      var videoTimeRatio = logVideoTime({duration: 10, currentTime: 7.5})
      expect(videoTimeRatio.toString()).equal('0.75')
    });

    it('video is fully visible', function() {   
      
      var visible = getVisible(video, window)
      expect(visible).equal(1)
    });

    it('video is out of sight', function() {   
      
      window.pageYOffset = 1455

      var visible = getVisible(video, window)
      expect(visible).equal(0)
    });
  })
})
