# This is super temporary, until I have time to do a proper Grunt task
# Build CSS file - just concat all .css in src/css
cat src/css/*.css > dist/AudioTags.bundle.css

# Build JS bundle using browserify
# the :AudioTag is for specifying the name the module will "expose" externally
browserify -r ./src/js/AudioTags:AudioTags > dist/AudioTags.dist.js

# Concat a few things together (uurgh)
cat src/libs/*.js dist/AudioTags.dist.js > dist/AudioTags.bundle.js
rm dist/AudioTags.dist.js
