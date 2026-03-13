#!/usr/bin/env python3
"""
Update Armenia LLM Summer School 2026 PowerPoint with requested changes.
"""
import os
import shutil
import subprocess
import zipfile
from pathlib import Path

# Paths
WORKSPACE = Path("/workspace")
PPTX_SRC = WORKSPACE / "2026" / "Armenia_LLM_Summer_School_2026 (2).pptx"
PPTX_OUT = WORKSPACE / "2026" / "Armenia_LLM_Summer_School_2026 (2).pptx"
EXTRACT_DIR = WORKSPACE / "2026" / "pptx_extract"


def extract_pptx():
    """Extract pptx to directory."""
    with zipfile.ZipFile(PPTX_SRC, 'r') as z:
        z.extractall(EXTRACT_DIR)


def create_pie_chart():
    """Create pie chart image for 35 students, 42 industry professionals."""
    try:
        import matplotlib
        matplotlib.use('Agg')
        import matplotlib.pyplot as plt
    except ImportError:
        print("matplotlib not installed, skipping pie chart")
        return False

    # Data: 35 students (45%), 42 industry (55%)
    sizes = [35, 42]
    labels = ['Students\n35 (45%)', 'Industry\n42 (55%)']
    colors = ['#6B21A8', '#4F46E5']  # Purple shades to match slide design
    explode = (0.02, 0.02)

    fig, ax = plt.subplots(figsize=(6, 5))
    ax.pie(sizes, explode=explode, labels=labels, colors=colors, autopct='',
           shadow=False, startangle=90, textprops={'fontsize': 14, 'color': '#0A192F'})
    ax.axis('equal')

    # Save with transparent background
    plt.tight_layout()
    plt.savefig(EXTRACT_DIR / 'ppt' / 'media' / 'image1.png', dpi=150, bbox_inches='tight',
                facecolor='#F8FAFC', edgecolor='none')
    plt.close()
    return True


def update_slide2_text():
    """Slide 2: Armenia alignment content."""
    slide_path = EXTRACT_DIR / 'ppt' / 'slides' / 'slide2.xml'
    content = slide_path.read_text(encoding='utf-8')

    # Replace title
    new_title = "ALIGNMENT WITH ARMENIA'S AI DEVELOPMENT"
    content = content.replace(
        "2026 CURRICULUM: BRIDGING THE GAP IN LLM RESEARCH",
        new_title
    )

    # Replace OBJECTIVE & SCOPE section content
    old_obj = """The summer school will offer a series of workshops, lectures, and hands-on sessions, aiming to bridge the knowledge gap among members of academia and industry in the fast-developing research area of foundational Large Language Models (LLMs)."""
    new_obj = """This summer school is in line with current developments in Armenia: compute infrastructure by Firebird, Eleveight and YSU, and policies. Armenia aims to grow the number of strong world-class AI researchers by 2032 to reach 200. This school supports this goal by empowering existing researchers and students."""

    content = content.replace(old_obj, new_obj)

    # Replace the curriculum paragraph - keep the structure but update
    old_curriculum = """The curriculum will cover a range of both core and specialized topics in LLMs, ensuring participants gain both theoretical depth and practical expertise.

Each offline participant gets  1 GPU for practical sessions."""
    new_curriculum = """The curriculum will cover a range of both core and specialized topics in LLMs, ensuring participants gain both theoretical depth and practical expertise.

Each offline participant gets 1 GPU for practical sessions."""
    content = content.replace(old_curriculum, new_curriculum)

    slide_path.write_text(content, encoding='utf-8')


def update_slide4_text():
    """Slide 4 (Proven Impact): Add participant stats and countries."""
    slide_path = EXTRACT_DIR / 'ppt' / 'slides' / 'slide4.xml'
    content = slide_path.read_text(encoding='utf-8')

    # Update the description text
    old_desc = """Our track record demonstrates a significant and growing interest in high-level AI education within Armenia and the region. The summer school has become a competitive hub for talent training."""
    new_desc = """Our track record demonstrates a significant and growing interest in high-level AI education within Armenia and the region. The summer school has become a competitive hub for talent training.

2025 Participation: 35 students (90% with financial aid), 42 industry professionals (paid 100,000 AMD). Participants from: Italy, USA, Russia, Iran, India, Armenia."""

    content = content.replace(old_desc, new_desc)

    slide_path.write_text(content, encoding='utf-8')


def update_slide9_text():
    """Slide 9 (Budget): Add financial aid data and budget breakdown."""
    slide_path = EXTRACT_DIR / 'ppt' / 'slides' / 'slide9.xml'
    content = slide_path.read_text(encoding='utf-8')

    # Add budget breakdown - we need to add new text. The slide has RESEARCHER TRAVEL and STUDENT FINANCIAL AID.
    # Add the budget breakdown text before "Your support directly enables"
    old_footer = """Your support directly enables global expertise to empower local talent in Armenia."""
    new_footer = """Last year budget: ~15K USD for speaker travel & accommodation in Yerevan; 11K USD for online accommodation, logistics, coffee breaks, networking. Financial aid: 35 students (90%); 42 industry professionals paid 100,000 AMD. 80 GPUs for school (~60K value); 1 GPU per student. Speakers: no honorarium, travel only. Venue: AI9 contribution.

Your support directly enables global expertise to empower local talent in Armenia."""

    content = content.replace(old_footer, new_footer)

    slide_path.write_text(content, encoding='utf-8')


def update_slide7_text():
    """Slide 7 (Partners): Add sponsor contribution details."""
    slide_path = EXTRACT_DIR / 'ppt' / 'slides' / 'slide7.xml'
    content = slide_path.read_text(encoding='utf-8')

    # Replace the partner description
    old_desc = """We are grateful for the continued support of our partners in building Armenia's AI ecosystem."""
    new_desc = """We are grateful for the continued support of our partners in building Armenia's AI ecosystem.

Armenia Fund: speaker travel & accommodation for 2025. Nebius: compute infrastructure partner. AI9 & AUA: venue partners. Arcs AI & ASOF: facilitated Armenia Fund and Summer School collaboration. Picsart: travel & speaker accommodation for 2024. Profound Academy: platform for entrance exam.

Collaborations: Martha Hovhannesian—Legal aspects of LLMs (post-school talk). Perouz Taslakian—AI Agents lecture at Yandex Hall. Picsart—office tour for participants."""

    content = content.replace(old_desc, new_desc)

    slide_path.write_text(content, encoding='utf-8')




def repack_pptx():
    """Repack pptx from extracted directory."""
    # Remove old output if exists
    if PPTX_OUT.exists():
        PPTX_OUT.unlink()

    # Create new zip with all files
    with zipfile.ZipFile(PPTX_OUT, 'w', zipfile.ZIP_DEFLATED) as zf:
        for root, dirs, files in os.walk(EXTRACT_DIR):
            for f in files:
                fp = Path(root) / f
                arcname = fp.relative_to(EXTRACT_DIR)
                zf.write(fp, arcname)


def main():
    print("Extracting pptx...")
    extract_pptx()

    print("Creating pie chart...")
    create_pie_chart()

    print("Updating slide 2...")
    update_slide2_text()

    print("Updating slide 4...")
    update_slide4_text()

    print("Updating slide 7 (partners + collaborations)...")
    update_slide7_text()

    print("Updating slide 9...")
    update_slide9_text()

    print("Repacking pptx...")
    repack_pptx()

    print("Done! Output:", PPTX_OUT)


if __name__ == "__main__":
    main()
