import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#0b0f14",
  },

  appBackground: {
    flex: 1,
  },

  appSafeArea: {
    flex: 1,
  },

  appGlowTop: {
    position: "absolute",
    top: -180,
    right: -120,
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: "#3b82f6",
    opacity: 0.08,
  },

  appGlowBottom: {
    position: "absolute",
    bottom: -200,
    left: -120,
    width: 340,
    height: 340,
    borderRadius: 170,
    backgroundColor: "#5ac8fa",
    opacity: 0.07,
  },

  topBar: {
    backgroundColor: "rgba(11, 15, 20, 0.95)",
    paddingTop: 8,
    paddingBottom: 12,
    paddingHorizontal: 14,
  },

  topBarTitle: {
    color: "#f8fafc",
    fontSize: 20,
    fontFamily: "SpaceGrotesk_700Bold",
    marginBottom: 10,
    letterSpacing: 0.3,
  },

  segment: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 12,
    padding: 4,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  segmentBtn: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
    borderRadius: 9,
  },

  segmentBtnActive: {
    backgroundColor: "rgba(90, 200, 250, 0.2)",
  },

  segmentTxt: {
    color: "#cbd5e1",
    fontWeight: "600",
    fontFamily: "SpaceGrotesk_500Medium",
  },

  segmentTxtActive: {
    color: "#e0f2fe",
    fontWeight: "700",
    fontFamily: "SpaceGrotesk_600SemiBold",
  },

  authBackground: {
    flex: 1,
  },

  authSafeArea: {
    flex: 1,
  },

  authScroll: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
  },

  authGlowTop: {
    position: "absolute",
    top: -120,
    right: -80,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: "#3b82f6",
    opacity: 0.12,
  },

  authGlowBottom: {
    position: "absolute",
    bottom: -140,
    left: -90,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: "#5ac8fa",
    opacity: 0.1,
  },

  authHero: {
    marginBottom: 28,
  },

  authBrand: {
    color: "#5ac8fa",
    fontSize: 12,
    letterSpacing: 3,
    textTransform: "uppercase",
    fontFamily: "SpaceGrotesk_600SemiBold",
  },

  authHeroTitle: {
    marginTop: 10,
    color: "#f9fafb",
    fontSize: 28,
    lineHeight: 34,
    fontFamily: "SpaceGrotesk_700Bold",
  },

  authHeroSubtitle: {
    marginTop: 6,
    color: "#94a3b8",
    fontSize: 14,
    lineHeight: 20,
    fontFamily: "SpaceGrotesk_400Regular",
  },

  authSheet: {
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  authTitle: {
    fontSize: 20,
    color: "#f8fafc",
    fontFamily: "SpaceGrotesk_700Bold",
  },

  authSubtitle: {
    marginTop: 6,
    color: "#94a3b8",
    fontFamily: "SpaceGrotesk_400Regular",
    fontSize: 13,
  },

  authForm: {
    marginTop: 16,
  },

  authInput: {
    marginTop: 12,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: "#f8fafc",
    fontFamily: "SpaceGrotesk_500Medium",
  },

  authButton: {
    marginTop: 18,
    backgroundColor: "#5ac8fa",
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center",
  },

  authButtonText: {
    color: "#0b0f14",
    fontFamily: "SpaceGrotesk_600SemiBold",
    fontSize: 14,
  },

  authSecondaryBtn: {
    marginTop: 12,
    paddingVertical: 8,
    alignItems: "center",
  },

  authSecondaryText: {
    color: "#e2e8f0",
    fontFamily: "SpaceGrotesk_600SemiBold",
    fontSize: 12,
  },

  authErrorText: {
    marginTop: 10,
    color: "#fecaca",
    fontFamily: "SpaceGrotesk_600SemiBold",
    fontSize: 12,
  },

  authSuccessText: {
    marginTop: 10,
    color: "#86efac",
    fontFamily: "SpaceGrotesk_600SemiBold",
    fontSize: 12,
  },

  authHelperText: {
    marginTop: 8,
    color: "#94a3b8",
    fontFamily: "SpaceGrotesk_400Regular",
    fontSize: 12,
  },

  hero: {
    margin: 14,
    marginBottom: 10,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  heroTitle: {
    color: "#f8fafc",
    fontSize: 24,
    fontWeight: "900",
    marginBottom: 4,
    fontFamily: "SpaceGrotesk_700Bold",
  },

  heroSubtitle: {
    color: "#b8c1cc",
    fontSize: 13,
    marginBottom: 14,
  },

  statRow: {
    flexDirection: "row",
  },

  statCard: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginRight: 10,
  },

  statValue: {
    color: "#5ac8fa",
    fontSize: 22,
    fontWeight: "900",
    fontFamily: "SpaceGrotesk_700Bold",
  },

  statLabel: {
    color: "#94a3b8",
    marginTop: 2,
    fontSize: 12,
    fontWeight: "700",
  },

  searchWrap: {
    paddingHorizontal: 14,
  },

  searchInput: {
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    paddingHorizontal: 14,
    paddingVertical: 11,
    fontSize: 15,
    color: "#f8fafc",
  },

  sectionTitle: {
    marginTop: 12,
    marginBottom: 7,
    paddingHorizontal: 14,
    fontSize: 13,
    fontWeight: "800",
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    fontFamily: "SpaceGrotesk_600SemiBold",
  },

  rowPad: {
    paddingHorizontal: 14,
    paddingBottom: 2,
  },

  chip: {
    backgroundColor: "rgba(255,255,255,0.08)",
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderRadius: 999,
    marginRight: 8,
  },

  chipActive: {
    backgroundColor: "rgba(90, 200, 250, 0.2)",
  },

  chipText: {
    color: "#cbd5e1",
    fontWeight: "700",
    fontSize: 14,
  },

  chipTextActive: {
    color: "#e0f2fe",
  },

  metaRow: {
    paddingHorizontal: 14,
    marginTop: 8,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  resultsText: {
    color: "#94a3b8",
    fontWeight: "700",
    fontSize: 12,
  },

  hintText: {
    paddingHorizontal: 14,
    marginTop: 6,
    color: "#94a3b8",
    fontWeight: "600",
    fontSize: 12,
  },

  locationActionRow: {
    marginTop: 8,
    marginHorizontal: 14,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  locationActionLabel: {
    flex: 1,
    marginRight: 8,
    color: "#e2e8f0",
    fontWeight: "700",
    fontSize: 12,
  },

  locationActionBtn: {
    backgroundColor: "#5ac8fa",
    color: "#0b0f14",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    fontWeight: "800",
    fontSize: 12,
    overflow: "hidden",
  },

  listPad: {
    paddingBottom: 24,
  },

  card: {
    marginHorizontal: 14,
    marginBottom: 10,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    flexDirection: "row",
    overflow: "hidden",
    padding: 0,
  },

  cardAccent: {
    width: 6,
    backgroundColor: "#5ac8fa",
  },

  cardContent: {
    flex: 1,
    padding: 12,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: "#f8fafc",
    marginBottom: 8,
    fontFamily: "SpaceGrotesk_700Bold",
  },

  badgeRow: {
    flexDirection: "row",
    marginBottom: 8,
  },

  badgePrimary: {
    backgroundColor: "rgba(90, 200, 250, 0.18)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    marginRight: 8,
  },

  badgePrimaryText: {
    color: "#e0f2fe",
    fontWeight: "800",
    fontSize: 12,
  },

  badgeMuted: {
    backgroundColor: "rgba(255,255,255,0.06)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },

  badgeMutedText: {
    color: "#cbd5e1",
    fontWeight: "700",
    fontSize: 12,
  },

  cardLine: {
    fontSize: 12,
    color: "#94a3b8",
    fontWeight: "600",
  },

  cardMetaRow: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  cardActionRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  cardMetaRowEnd: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },

  cardMetaText: {
    color: "#94a3b8",
    fontWeight: "700",
    fontSize: 12,
  },

  cardActionBtn: {
    backgroundColor: "#5ac8fa",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },

  cardActionGhost: {
    marginLeft: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 12,
    paddingVertical: 6,
  },

  cardActionText: {
    color: "#0b0f14",
    fontWeight: "800",
    fontSize: 12,
  },

  cardActionGhostText: {
    color: "#e2e8f0",
    fontWeight: "700",
    fontSize: 12,
  },

  mapWrap: {
    flex: 1,
    margin: 14,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },

  map: {
    flex: 1,
  },

  mapRefreshBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(15, 23, 42, 0.9)",
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },

  mapRefreshText: {
    color: "#f8fafc",
    fontWeight: "800",
    fontSize: 12,
  },

  floatingReloadBtn: {
    position: "absolute",
    right: 16,
    bottom: 20,
    backgroundColor: "#5ac8fa",
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 10,
    elevation: 4,
  },

  floatingReloadText: {
    color: "#0b0f14",
    fontWeight: "800",
    fontSize: 13,
  },

  centerBox: {
    paddingVertical: 28,
    alignItems: "center",
    justifyContent: "center",
  },

  centerText: {
    marginTop: 8,
    color: "#94a3b8",
    fontWeight: "700",
  },

  errorBox: {
    marginHorizontal: 14,
    marginBottom: 70,
    backgroundColor: "rgba(248,113,113,0.12)",
    borderColor: "rgba(248,113,113,0.3)",
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  errorText: {
    color: "#fecaca",
    fontWeight: "700",
    flex: 1,
    marginRight: 10,
    fontSize: 12,
  },

  retryBtn: {
    backgroundColor: "#f87171",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },

  retryText: {
    color: "#0b0f14",
    fontWeight: "800",
    fontSize: 12,
  },

  glassCard: {
    backgroundColor: "rgba(15, 23, 42, 0.65)",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    padding: 16,
  },

  screenPad: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12,
  },

  screenEyebrow: {
    color: "#94a3b8",
    fontSize: 12,
    letterSpacing: 2,
    textTransform: "uppercase",
    fontFamily: "SpaceGrotesk_600SemiBold",
  },

  screenTitle: {
    marginTop: 6,
    color: "#f8fafc",
    fontSize: 26,
    fontFamily: "SpaceGrotesk_700Bold",
  },

  screenSubtitle: {
    marginTop: 6,
    color: "#9aa4b2",
    fontSize: 13,
    fontFamily: "SpaceGrotesk_400Regular",
  },

  sectionBlock: {
    marginTop: 12,
    paddingHorizontal: 20,
  },

  sectionTitleAlt: {
    color: "#cbd5e1",
    fontSize: 13,
    fontFamily: "SpaceGrotesk_600SemiBold",
    marginBottom: 10,
  },

  heroCard: {
    marginHorizontal: 20,
  },

  heroRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  heroMeta: {
    flex: 1,
    marginLeft: 16,
  },

  heroValueText: {
    color: "#f8fafc",
    fontSize: 22,
    fontFamily: "SpaceGrotesk_700Bold",
  },

  heroLabel: {
    color: "#94a3b8",
    marginTop: 4,
    fontSize: 12,
    fontFamily: "SpaceGrotesk_400Regular",
  },

  heroBadge: {
    marginTop: 10,
    alignSelf: "flex-start",
    backgroundColor: "rgba(90, 200, 250, 0.15)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },

  heroBadgeText: {
    color: "#e0f2fe",
    fontSize: 11,
    fontFamily: "SpaceGrotesk_600SemiBold",
  },

  sessionCard: {
    marginBottom: 8,
  },

  sessionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  sessionTitle: {
    color: "#f8fafc",
    fontSize: 16,
    fontFamily: "SpaceGrotesk_600SemiBold",
  },

  sessionSubtitle: {
    color: "#94a3b8",
    marginTop: 4,
    fontSize: 12,
    fontFamily: "SpaceGrotesk_400Regular",
  },

  primaryButton: {
    backgroundColor: "#5ac8fa",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },

  primaryButtonDisabled: {
    opacity: 0.5,
  },

  primaryButtonText: {
    color: "#0b0f14",
    fontSize: 12,
    fontFamily: "SpaceGrotesk_700Bold",
  },

  highlightCard: {
    marginTop: 4,
  },

  highlightTitle: {
    color: "#f8fafc",
    fontSize: 15,
    fontFamily: "SpaceGrotesk_600SemiBold",
  },

  highlightSubtitle: {
    color: "#9aa4b2",
    marginTop: 6,
    fontSize: 12,
    fontFamily: "SpaceGrotesk_400Regular",
  },

  highlightRow: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  highlightActionRow: {
    marginTop: 14,
    alignItems: "flex-start",
  },

  highlightMeta: {
    color: "#e2e8f0",
    fontSize: 12,
    fontFamily: "SpaceGrotesk_500Medium",
  },

  sessionHeroCard: {
    marginHorizontal: 20,
    alignItems: "center",
  },

  sessionStats: {
    marginTop: 16,
    width: "100%",
  },

  sessionTimerText: {
    color: "#fda4af",
    fontSize: 12,
    fontFamily: "SpaceGrotesk_600SemiBold",
    marginTop: 6,
  },

  sessionStatItem: {
    marginBottom: 12,
  },

  metricLabel: {
    color: "#94a3b8",
    fontSize: 12,
    fontFamily: "SpaceGrotesk_400Regular",
  },

  metricValue: {
    color: "#f8fafc",
    fontSize: 18,
    fontFamily: "SpaceGrotesk_700Bold",
    marginTop: 4,
  },

  sessionActions: {
    marginTop: 24,
    paddingHorizontal: 20,
  },

  ghostButton: {
    marginTop: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: "center",
  },

  ghostButtonText: {
    color: "#e2e8f0",
    fontSize: 12,
    fontFamily: "SpaceGrotesk_600SemiBold",
  },

  batteryRing: {
    alignItems: "center",
    justifyContent: "center",
  },

  batteryRingLabel: {
    position: "absolute",
    alignItems: "center",
  },

  batteryRingValue: {
    color: "#f8fafc",
    fontSize: 20,
    fontFamily: "SpaceGrotesk_700Bold",
  },

  batteryRingCaption: {
    color: "#94a3b8",
    fontSize: 11,
    fontFamily: "SpaceGrotesk_400Regular",
  },

  routeMapWrap: {
    marginHorizontal: 20,
    borderRadius: 22,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  routeMap: {
    height: 220,
  },

  routeCard: {
    marginHorizontal: 20,
    marginTop: 16,
  },

  routeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  routeValue: {
    color: "#f8fafc",
    fontSize: 18,
    fontFamily: "SpaceGrotesk_700Bold",
  },

  routeLabel: {
    color: "#94a3b8",
    marginTop: 4,
    fontSize: 12,
    fontFamily: "SpaceGrotesk_400Regular",
  },

  routeDivider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.08)",
    marginVertical: 12,
  },

  routeStopTitle: {
    color: "#e2e8f0",
    fontSize: 13,
    fontFamily: "SpaceGrotesk_600SemiBold",
  },

  routeStopSubtitle: {
    marginTop: 6,
    color: "#94a3b8",
    fontSize: 12,
    fontFamily: "SpaceGrotesk_400Regular",
  },

  healthCard: {
    marginHorizontal: 20,
    alignItems: "center",
  },

  healthStats: {
    marginTop: 16,
    width: "100%",
  },

  healthStatItem: {
    marginBottom: 12,
  },

  healthInsightCard: {
    marginHorizontal: 20,
    marginTop: 16,
  },

  healthInsightTitle: {
    color: "#e2e8f0",
    fontSize: 13,
    fontFamily: "SpaceGrotesk_600SemiBold",
  },

  healthInsightText: {
    marginTop: 6,
    color: "#94a3b8",
    fontSize: 12,
    fontFamily: "SpaceGrotesk_400Regular",
  },

  profileCard: {
    marginHorizontal: 20,
  },

  profileRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  profileLabel: {
    color: "#94a3b8",
    fontSize: 12,
    fontFamily: "SpaceGrotesk_400Regular",
  },

  profileValue: {
    color: "#f8fafc",
    fontSize: 12,
    fontFamily: "SpaceGrotesk_600SemiBold",
  },

  bookingCard: {
    marginHorizontal: 20,
    marginTop: 4,
  },

  bookingSectionTitle: {
    color: "#e2e8f0",
    fontSize: 13,
    fontFamily: "SpaceGrotesk_600SemiBold",
    marginBottom: 12,
  },

  slotGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  slotChip: {
    width: "48%",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    backgroundColor: "rgba(255,255,255,0.04)",
    paddingVertical: 10,
    alignItems: "center",
    marginBottom: 12,
  },

  slotChipActive: {
    backgroundColor: "rgba(90, 200, 250, 0.2)",
    borderColor: "rgba(90, 200, 250, 0.5)",
  },

  slotChipDisabled: {
    opacity: 0.45,
  },

  slotText: {
    color: "#cbd5e1",
    fontSize: 12,
    fontFamily: "SpaceGrotesk_600SemiBold",
  },

  slotTextActive: {
    color: "#e0f2fe",
  },

  slotTextDisabled: {
    color: "#94a3b8",
  },

  slotStatusText: {
    marginTop: 4,
    color: "#fda4af",
    fontSize: 10,
    fontFamily: "SpaceGrotesk_600SemiBold",
    textTransform: "uppercase",
  },

  bookingFooter: {
    marginTop: 20,
    paddingHorizontal: 20,
  },

  bookingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  bookingLabel: {
    color: "#94a3b8",
    fontSize: 12,
    fontFamily: "SpaceGrotesk_400Regular",
  },

  bookingValue: {
    color: "#f8fafc",
    fontSize: 12,
    fontFamily: "SpaceGrotesk_600SemiBold",
  },

  bookingSuccessTitle: {
    color: "#f8fafc",
    fontSize: 16,
    fontFamily: "SpaceGrotesk_600SemiBold",
  },

  bookingSuccessSubtitle: {
    marginTop: 6,
    color: "#9aa4b2",
    fontSize: 12,
    fontFamily: "SpaceGrotesk_400Regular",
  },

  bookingSuccessHint: {
    marginTop: 10,
    color: "#94a3b8",
    fontSize: 12,
    fontFamily: "SpaceGrotesk_400Regular",
  },

  bookingSuccessPolicy: {
    marginTop: 8,
    color: "#cbd5e1",
    fontSize: 11,
    fontFamily: "SpaceGrotesk_400Regular",
    lineHeight: 16,
  },

  demoAvailabilityBlock: {
    marginTop: 14,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.08)",
  },

  demoAvailabilityTitle: {
    color: "#e2e8f0",
    fontSize: 12,
    fontFamily: "SpaceGrotesk_600SemiBold",
    marginBottom: 8,
  },

  demoSlotRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  demoSlotLabel: {
    color: "#cbd5e1",
    fontSize: 11,
    fontFamily: "SpaceGrotesk_600SemiBold",
    width: 70,
  },

  demoSlotStatus: {
    fontSize: 10,
    fontFamily: "SpaceGrotesk_600SemiBold",
    textTransform: "uppercase",
    marginRight: 8,
  },

  demoSlotAvailable: {
    color: "#86efac",
  },

  demoSlotBooked: {
    color: "#fda4af",
  },
});

export default styles;
