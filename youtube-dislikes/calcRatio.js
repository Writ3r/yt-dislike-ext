// HELPERS
// ==========================================

function contains(node, selector, text) {
    var elements = node.querySelectorAll(selector);
    return Array.prototype.filter.call(elements, function(element){
      return RegExp(text).test(element.textContent);
    });
}

// MAIN FUNCTION
// ==========================================

function updateDislikes() {

    // GLOBAL VARS
    // ==========================================

    likeCount = null
    viewCount = null

    // Step 1 - FIND LIKES / VIEWS TO CREATE RATIO
    // ==========================================

    var likesInterval = setInterval(function() {
        menueNode = document.getElementById("menu-container")
        if (menueNode != null) {
            likeNode = menueNode.querySelector('[aria-label*=" likes"]');
            if (likeNode != null) {
                clearInterval(likesInterval);
                likeCountVal = likeNode.getAttribute('aria-label');
                likeCount = parseInt(likeCountVal.split(" ")[0].replaceAll(',', ''));
            }
        }
    }, 100);

    var viewsInterval = setInterval(function() {
        menueNode = document.getElementById("info-text")
        if (menueNode != null) {
            viewNode = menueNode.querySelector('[class="view-count style-scope ytd-video-view-count-renderer"]');
            if (viewNode != null) {
                clearInterval(viewsInterval);
                viewCountVal = viewNode.innerHTML;
                viewCount = parseInt(viewCountVal.split(" ")[0].replaceAll(',', ''));
            }
        }
    }, 100);

    // Step 2 - REPLACE DISLIKE WITH PERCENT OF PEOPLE WHO DON'T LIKE THE VIDEO
    // ==========================================

    var perctInterval = setInterval(function() {
        if (likeCount != null && viewCount != null) {
            menueNode = document.getElementById("menu-container")
            if (menueNode != null) {
                dislikeNodes = contains(menueNode, 'yt-formatted-string', '^Dislike$');
                if (dislikeNodes.length == 0) {
                    dislikeNodes = contains(menueNode, 'yt-formatted-string', '.*[%]$');
                }
                if (dislikeNodes.length > 0) {
                    dislikeNode = dislikeNodes[0]
                    clearInterval(perctInterval);
                    ratio = (100 - ((likeCount / viewCount) * 100)).toString()
                    dislikeNode.innerHTML = ratio.substring(0,4) + '%'
                }
            }
        }
    }, 100);

}

// RUN EVERY NAVIGATE
// ==========================================

updateDislikes();
window.addEventListener("yt-navigate-finish", updateDislikes, true);